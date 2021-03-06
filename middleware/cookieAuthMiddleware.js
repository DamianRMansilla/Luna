const path = require("path");
//const fs = require("fs");
const db = require("../database/models");
const { unsubscribe } = require("../src/routes/main");

function cookieAuthMiddleware (req, res, next){
    if (req.cookies != undefined && req.cookies.rememberme) {
        if(req.cookies != undefined && req.session.userLogged == undefined){
            db.User.findOne({
                where: {email: req.cookies.rememberme}
            })
            .then(function(usersDatabase){
                req.session.userLogged = usersDatabase
            })
        }
    }
    res.locals.userLogged =  req.session.userLogged;
    next();
}

module.exports = cookieAuthMiddleware


// function cookieAuthMiddleware (req, res, next){
//     next();
    
//     if (req.cookies.rememberme != undefined && req.session.usuarioLogueado == undefined) {
//         let archivoUsuario = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
//         let usuarios;

//         if (archivoUsuario == "") {
//             usuarios = [];
//         } else {
//             usuarios = JSON.parse(archivoUsuario);
//         }

//         for (let i = 0; i < usuarios.length; i++) {
//             if (usuarios[i].Mail == req.cookies.rememberme){
//                     usuarioALoguearse = usuarios[i];
//                     break;
//                 }
//             }
//         req.session.usuarioLogueado == usuarioALoguearse;
//     }
// }