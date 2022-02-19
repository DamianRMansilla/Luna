const express = require("express");
const path = require("path");
const multer = require("multer");
const userControlador = require("../controllers/userController.js");
const { body } = require("express-validator");
const { BADFAMILY } = require("dns");
const guestMiddleware = require("../../middleware/guestMiddleware");
const authMiddleware = require("../../middleware/authMiddleware.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/profileImg"))
    },
    filename: (req, file, cb) => {
        newFileName = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
})

const upload = multer({ storage })

let router = express.Router();

// Validaciones

const validaciones = [
    body("name").notEmpty().withMessage("Debes completar el campo nombre"),
    body("last_name").notEmpty().withMessage("Debes completar el campo apellido"),
    body("user").notEmpty().withMessage("Debes completar el campo usuario"),
    body("mail").notEmpty().withMessage("Debes completar el campo correo electronico").bail().isEmail().withMessage("Debes cargar una dirección de mail válida"),
    body("password").notEmpty().withMessage("Debes completar el campo contraseña").bail().isAlphanumeric().withMessage("El password debe ser alfanumerico"),
    body("userImage").custom((value, { req }) => {
        let file = req.file;
        let extensionesPermitidas = [".jpg", ".png", ".gif"]
        if(!file){
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileExtesion = path.extname(file.originalname);
            if (!extensionesPermitidas.includes(fileExtesion)){
                throw new Error("Las extensiones permitidas son ${extensionesPermitidas.join(', ')}");
            }
        }
        return true;
    })
]

const validacionesLogin = [
    body("emailLogin").notEmpty().withMessage("Por favor introduce un email válido"),
    body("passwordLogin").notEmpty().withMessage("Por favor ingresa una contraseña").bail().isAlphanumeric().withMessage("La contraseña debe ser alfanumerica")
]


// Rutas

router.get("/register", guestMiddleware, userControlador.register);
router.post("/register", upload.single("userImage"), validaciones, userControlador.newUser);

router.get("/login", guestMiddleware, userControlador.login);
router.post ("/login", userControlador.connect);
/*validacionesLogin,*/ 
router.get("/check", function(req, res){
    if (req.session.usuarioLogueado == undefined){
        res.send("No estas logueado");
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.Mail)
    }
})

router.get("/edit/:id", userControlador.edit);
router.put ("/edit/:id", userControlador.update);

router.delete("/delete/:id", userControlador.destroy);

router.get("/profile", authMiddleware, userControlador.profile);

router.get("/logout", userControlador.logout)


module.exports = router