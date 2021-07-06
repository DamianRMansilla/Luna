const express = require("express");
const path = require("path")
const controladorProductos = require("../controllers/productsController.js")
const multer = require("multer")

let router = express.Router();

router.get("/", controladorProductos.products);

router.get("/trousers", controladorProductos.trousers)

router.get("/tshirt", controladorProductos.tshirt)

router.get("/sweater", controladorProductos.sweater)

router.get("/sweater/:id?", controladorProductos.sweaterID)

router.get("/new_in", controladorProductos.new_in)

router.get("/new", controladorProductos.new) // Vista de creacion de producto
router.post("/new", controladorProductos.create) // Logica de creacion de producto

router.get("/edit/:id", controladorProductos.edit) // Vista de edicion de producto
router.put("/edit/:id", controladorProductos.update) // Logica de edicion de producto


router.delete("/delete/:id", controladorProductos.delete) //controladorProductos.delete)

module.exports = router