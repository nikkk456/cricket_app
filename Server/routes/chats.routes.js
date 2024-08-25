const express = require("express");
const verifytoken = require("../services/token_verify");
const getchats = require("../controller/getchats.controller");
const routes = express.Router();

routes.route("/getchats").post(verifytoken,getchats);

module.exports = routes;