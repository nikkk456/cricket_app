const express = require("express");
const verifytoken = require("../services/token_verify");
const getchats = require("../controller/getchats.controller");
const roomchats = require("../controller/roomchats.controller");
const routes = express.Router();

routes.route("/getchats").post(verifytoken,getchats);
routes.route("/roomchats").post(verifytoken,roomchats);
module.exports = routes;