const express = require("express");
const path = require("path")
const controladorProductos = require("../controllers/productsController.js")
const multer = require("multer")

let router = express.Router();

/* ---------------------------------- Creation Fileupload for images -------------------------------------*/

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/productsImage"))
    },
    filename: (req, file, cb) => {
        const imageName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, imageName)
    }
})

const fileUpload = multer({storage})
/* ---------------------------------------------- Routes ------------------------------------------------*/

router.get("/", controladorProductos.products);

router.get("/trousers", controladorProductos.trousers)

router.get("/trousers/:id", controladorProductos.trousersID)

router.get("/tshirt", controladorProductos.tshirt)

router.get("/tshirt/:id", controladorProductos.tshirtID)

router.get("/sweater", controladorProductos.sweater)

router.get("/sweater/:id?", controladorProductos.sweaterID)

router.get("/new_in", controladorProductos.new_in)

router.get("/new", controladorProductos.new) // Vista de creacion de producto
router.post("/new", fileUpload.single("file"), controladorProductos.create) // Logica de creacion de producto

router.get("/edit/:id", controladorProductos.edit) // Vista de edicion de producto
router.put("/edit/:id", fileUpload.single("file"), controladorProductos.update) // Logica de edicion de producto

router.get("/cart", controladorProductos.cart)

router.post("/delete/:id", controladorProductos.delete)

router.get("/search", controladorProductos.search)

router.get("/:id", controladorProductos.detail)


module.exports = router