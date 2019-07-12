var express = require("express");
var router = express.Router();

const { authController } = require("../controller/auth.controller");

router
  .post("/login", authController.auth)
  .post("/valid/token", authController.validAccessToken);

module.exports = router;
