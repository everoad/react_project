const request = require("request-promise");

const oauthInfo = require("../oauth.info");

const { encrypt } = require("../utils/token.crypt");

const createRequestOptions = (body) => {
  let client = oauthInfo.local.client;

  let auth = Buffer.from(`${client.clientId}:${client.clientSecret}`).toString("base64");

  let url;
  
  switch (body.grant_type) {
    case "password":
      url = client.accessTokenUri;
      break;
    case "refresh_token":
      url = client.accessTokenUri;
      break;
    default:
      url = client.checkAccessTokenUri;
      break;
  }

  const options = {
    url: url,
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: body
  };

  return options;
};

exports.authController = {
  auth: (req, res, next) => {

    const options = createRequestOptions(req.body);

    request
      .post(options)
      .then(jwt => {
        jwt = JSON.parse(jwt);
        let userInfo = jwt.access_token.split(".")[1];
        userInfo = Buffer.from(userInfo, "base64").toString("ascii");

        res.json({
          user: JSON.parse(userInfo),
          token: {
            access_token: encrypt(jwt.access_token),
            refresh_token: encrypt(jwt.refresh_token)
          }
        });
      })
      .catch(err => {
        res.status(err.statusCode || 500);
        res.json(JSON.parse(err.error));
        next(err)
      });
  },

  validAccessToken: (req, res, next) => {
    const { token } = req.body;

    const options = createRequestOptions({ token });

    request.post(options).then(
      jwt => {
        let userInfo = token.split(".")[1];
        userInfo = Buffer.from(userInfo, "base64").toString("ascii");

        res.json({
          user: userInfo
        });
      },
      err => {
        res.status(err.statusCode || 500);
        res.json(JSON.parse(err.error));
        next(err)
      }
    );
  }
};
