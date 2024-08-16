const express = require("express");
const router  = express.Router();
const notification_list = require("../controller/notification_list.controller");
const verifytoken = require("../services/token_verify");

router.route("/list").post(verifytoken,notification_list);

module.exports = router;