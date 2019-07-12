var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const { apiController } = require("../controller/api.controller");

router.post("/data/upload", upload.single("file"), apiController.upload);
router.all("/*", apiController.callAPI);

module.exports = router;
