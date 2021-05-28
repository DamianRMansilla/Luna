const express = require("express");
const path = require("path")
const mainControlador = require("../controllers/mainController.js")

let router = express.Router();

router.get("/", mainControlador.home);

router.get("/contact_us", mainControlador.contact_us);

router.get("/log_in", mainControlador.log_in);

router.get("/register", mainControlador.register);

module.exports = router