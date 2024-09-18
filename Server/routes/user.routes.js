const express = require("express");
const router = express.Router();
const registeruser = require("../controller/register.controller.js");
const loginuser = require("../controller/login.controller.js");
const otpgenerate = require("../controller/otp.controller.js");
const userprofile = require("../controller/profile.controller.js");
const verifytoken = require("../services/token_verify.js");
const profile_update = require("../controller/updateprofile.controller.js");
const upload = require('../services/upload.js');
const  ForgetPassword  = require("../controller/forgot_pass.controller.js");
const otpVerify = require("../controller/otp_verify.controller.js")
const resetpass = require("../controller/reset_password.controller.js");
const referral = require("../controller/referral.controller.js");

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/otp").post(otpgenerate);
router.route("/profile").post(verifytoken,userprofile);
router.route("/profile_update").post(verifytoken,upload.single('profilePicture'),profile_update);
router.route("/forgot_pass").post(ForgetPassword);
router.route("/verifyotp").post(otpVerify);
router.route("/resetpass").post(resetpass);
router.route("/generate-referral").post(referral);
module.exports = router;
