const express = require("express");
const router  = express.Router();
const notification_list = require("../controller/notification_list.controller");
const verifytoken = require("../services/token_verify");
const accept_request = require("../controller/accept_request.controller");
router.route("/list").post(verifytoken,notification_list);
router.route("/accept_request").post(verifytoken , accept_request);

module.exports = router;