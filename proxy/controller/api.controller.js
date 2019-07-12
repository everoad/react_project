const request = require("request-promise");

const oauthInfo = require("../oauth.info");
const { decrypt } = require("../utils/token.crypt");
const fs = require("fs");

exports.apiController = {
  callAPI: (req, res, next) => {
    const options = {
      url: `http://localhost:8082${req.url}`,
      method: req.method,
      json: true,
      headers: {
        "Content-type": req.get("Content-type")
      },
      body: req.body
    };

    if (req.get("token")) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${decrypt(req.get("token"))}`
      };
    } else {
      let client = oauthInfo.local.client;
      let auth = Buffer.from(
        `${client.clientId}:${client.clientSecret}`
      ).toString("base64");

      options.headers = {
        ...options.headers,
        Authorization: `Basic ${auth}`
      };
    }
    request[req.method.toLowerCase()](options)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(err.statusCode);
        res.json(err.error);
        next(err);
      });
  },

  upload: (req, res, next) => {
    const options = {
      url: `http://localhost:8082${req.url}`,
      method: req.method,
      json: true,
      headers: {
        Authorization: `Bearer ${decrypt(req.get("token"))}`
      },
      formData: {
        // Like <input type="file" name="file">
        [req.file.fieldname]: {
          value: req.file.buffer,
          options: {
            filename: req.file.originalname,
            contentType: req.file.mimetype
          }
        }
      }
    };

    request[req.method.toLowerCase()](options)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(err.statusCode);
        res.json(err.error);
        next(err);
      });
  }
};
