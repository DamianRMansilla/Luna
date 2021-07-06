const path = require("path");
const fs = require("fs")
const { writeFileSync } = require("fs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")


let userController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/register"))
    },
    
    newUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            if (req.file) {
                let readUsers = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
                let users
                if (readUsers == ""){ users = []}
                else { users = JSON.parse(readUsers)}

                const lastUserID = () => {
                    let ultimo = 0
                    users.forEach(oneUser => {
                        if (ultimo < oneUser.id){ 
                            ultimo = oneUser.id}
                    });
                    return ultimo
                }

                let userList = {
                    id: lastUserID() + 1,
                    Nombre: req.body.name,
                    Apellido: req.body.last_name,
                    User: req.body.user,
                    Avatar: req.file.filename,
                    Mail: req.body.mail,
                    Contraseña: bcrypt.hashSync(req.body.password, 10)
                }

                users.push(userList)

                let userJSON = JSON.stringify(users, null, " ")
                fs.writeFileSync(path.resolve(__dirname, "../data/usersDB.json"), userJSON)

                res.redirect("/user/login")
            } else {
                res.render(path.resolve(__dirname, "../views/user/register.ejs"))
            }} else {
                res.render(path.resolve(__dirname, "../views/user/register.ejs"), { errors: errors.mapped(), old: req.body })
            }

    },
    
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/log_in"))
    },

    connect: (req, res) => {
        let archivoUsuario = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        let usuarios;

        if (archivoUsuario == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUsuario);
        }

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].Mail == req.body.email){
                if (bcrypt.compareSync(req.body.password, usuarios[i].Contraseña)){
                    usuarioALoguearse = usuarios[i];
                    break;
                }
            }
        }
        if(usuarioALoguearse == undefined) {
            return res.render(path.join(__dirname, "../views/user/log_in.ejs"));
        } else {        
            req.session.usuarioLogueado = usuarioALoguearse;

            if(req.body.rememberme != undefined){
                res.cookie("rememberme", usuarioALoguearse.Mail, {maxAge: 60000})
            }
            res.send(req.session.usuarioLogueado)}
        

    },

    edit: (req, res) =>{
        let users = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        users = JSON.parse(users)
        let user = users.find(user => user.id == req.params.id);

        res.render((path.resolve(__dirname, "../views/user/editUser")), {user})
    },

    update: (req, res) => {
        let idUser = req.params.id
        let readUser = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        let users = JSON.parse(readUser)

        users.forEach(user => {
            if (user.id == idUser) {
                user.Nombre = req.body.name,
                user.Apellido = req.body.last_name,
                user.User = req.body.user,
                user.Avatar = req.file.filename,
                user.Mail = req.body.mail,
                Contraseña= req.body.password

            }
        })

        let updateUser = JSON.stringify(users, null, " ")
        fs.writeFileSync(path.join(__dirname, "../data/usersDB.json"), updateUser)

        res.redirect("/")
    },

    profile: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/profileUser.ejs"))
    }

} 

module.exports = userController