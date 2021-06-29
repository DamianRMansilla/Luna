const express = require("express");
const path = require("path");
const userControlador = require("../controllers/userController.js");

let router = express.Router();

router.get("/register", userControlador.register);
router.post("/register", userControlador.newUser);

router.get("/login", userControlador.login);
router.post ("/login", userControlador.connect);

router.get("/edit:id", userControlador.edit);
router.post ("/edit:id", userControlador.change);

module.exports = router