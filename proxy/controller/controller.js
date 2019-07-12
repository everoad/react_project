const request = require("request-promise");
const bcrypt = require("bcrypt");

const crypto = require("crypto");
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";

const oauthInfo = require("../oauth.info");
const urlInfo = require("../url.info");

const encrypt = text => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("base64");
};

const decrypt = text => {
  let encryptedText = Buffer.from(text, "base64");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
};

exports.proxyController = {
  callAPI: async (req, res, next) => {
    let jwt = null;
    try {
      if (req.cookies.webClient) {
        jwt = decrypt(req.cookies.webClient);
        if (!jwt.access_token) {
          return res.json({ code: 1, message: "AccessToken is not existed." });
        }
      } else {
        return res.json({ code: 1, message: "Cookie is not existed." });
      }

      const options = {
        url: `${urlInfo.build(urlInfo.resource)}${req.url}`,
        method: req.method,
        headers: {
          Authorization: `Bearer ${jwt.access_token}`
        },
        json: true
      };

      let result = await request[req.method.toLowerCase()](options);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }
};

exports.authController = {
  auth: (req, res, next) => {
    const client = oauthInfo.local.client;
    res.redirect(
      `${client.userAuthorizationUri}?client_id=${client.clientId}&scope=${
        client.scope
      }&redirect_url=${client.redirectUri}&response_type=code`
    );
  },

  authCallback: async (req, res, next) => {
    let client = oauthInfo.local.client;
    let code = req.query.code;
    let auth = Buffer.from(
      `${client.clientId}:${client.clientSecret}`
    ).toString("base64");
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(client.clientSecret, salt);

    const options = {
      url: client.accessTokenUri,
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      form: {
        client_id: client.clientId,
        client_secret: hash,
        grant_type: "authorization_code",
        code: code,
        scope: client.scope,
        redirect_url: client.redirectUri
      }
    };

    let jwt = await request.post(options);
    res.cookie("webClient", encrypt(jwt), {
      maxAge: 7 * 24 * 3600 * 1000
    });
    //res.json(jwt)
    res.redirect(urlInfo.build(urlInfo.web));
  },

  userInfo: (req, res, next) => {
    try {
      let jwt = decrypt(req.cookies.webClient);
      let userInfo = jwt.access_token.split(".")[1];
      userInfo = Buffer.from(userInfo, "base64").toString("ascii");
      userInfo = JSON.parse(userInfo);
      res.json(userInfo);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e });
    }
  }
};
