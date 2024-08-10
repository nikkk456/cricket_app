const express = require("express");
const router = express.Router();
const friendslist = require("../controller/friend.controller.js");
const verifytoken = require("../services/token_verify.js");
const searchfriend = require("../controller/searchfriends.controller.js");
router.route("/list").post(verifytoken,friendslist);
router.route("/searchfriends").post(searchfriend);
module.exports = router;