const express = require("express");
const router = express.Router();
const registeruser = require("../controller/register.controller.js");
const loginuser = require("../controller/login.controller.js");
const otpgenerate = require("../controller/otp.controller.js");
const userprofile = require("../controller/profile.controller.js");
const verifytoken = require("../services/token_verify.js");
const profile_update = require("../controller/updateprofile.controller.js");

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/otp").post(otpgenerate);
router.route("/profile").post(verifytoken,userprofile);
router.route("/profile_update").post(verifytoken,profile_update);
module.exports = router;
