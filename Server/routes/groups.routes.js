const express = require("express");
const router = express.Router();

const verifytoken = require("../services/token_verify");
const groupslist = require("../controller/groupslist.controller.js");

router.route("/groupslist").post(verifytoken,groupslist);


module.exports = router;