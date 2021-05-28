const express = require("express");
const path = require("path")
const controladorProductos = require("../controllers/productsController.js")

//const publicPath = path.resolve(__dirname, "../public");
//app.use(express.static(publicPath));

let router = express.Router();

router.get("/", controladorProductos.products);

router.get("/trousers", controladorProductos.trousers)

router.get("/tshirt", controladorProductos.tshirt)

router.get("/new_in", controladorProductos.new_in)

module.exports = router