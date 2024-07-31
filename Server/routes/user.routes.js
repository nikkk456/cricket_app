const express = require("express");
const router = express.Router();
const registeruser = require("../controller/register.controller.js");
const loginuser = require("../controller/login.controller.js");
const otpgenerate = require("../controller/otp.controller.js");

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/otp").post(otpgenerate);
module.exports = router;
