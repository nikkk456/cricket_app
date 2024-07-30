const express = require("express");
const router = express.Router();
const registeruser = require("../controller/register.controller.js");
const loginuser = require("../controller/login.controller.js");

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
module.exports = router;
