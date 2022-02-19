const path = require("path");
const fs = require("fs")
const { writeFileSync } = require("fs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel")
let db = require("../../database/models");


let userController = {
    // Ruta que muestra registro
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/register"))
    },
    
    // Creacion usuario nuevo
    newUser: (req, res) => {
        db.User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.mail,
            idcarrito: Date.now(),
            password: req.body.password,//bcrypt.hashSync(req.body.password,10),
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            avatar: req.file.filename,
        })

        .catch(function (err) {
          console.log("no se creo el usuario", err)});

        res.redirect("/")


        // Creacion en JSON
        // let errors = validationResult(req);

        // if (errors.isEmpty()){
        //     if (req.file) {
        //         let readUsers = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        //         let users
        //         if (readUsers == ""){ users = []}
        //         else { users = JSON.parse(readUsers)}

        //         let userInDB = User.findByField("Mail", req.body.mail);

        //         if(userInDB){
        //             return res.render(path.resolve(__dirname, "../views/user/register.ejs"), {
        //                 errors: {
        //                     mail: { msg: "Este email ya se encuentra registrado"}
        //                 }
        //             })
        //         };

        //         const lastUserID = () => {
        //             let ultimo = 0
        //             users.forEach(oneUser => {
        //                 if (ultimo < oneUser.id){ 
        //                     ultimo = oneUser.id}
        //             });
        //             return ultimo
        //         }

        //         let userList = {
        //             id: lastUserID() + 1,
        //             Nombre: req.body.name,
        //             Apellido: req.body.last_name,
        //             User: req.body.user,
        //             Avatar: req.file.filename,
        //             Mail: req.body.mail,
        //             Contraseña: bcrypt.hashSync(req.body.password, 10)
        //         }

        //         users.push(userList)

        //         let userJSON = JSON.stringify(users, null, " ")
        //         fs.writeFileSync(path.resolve(__dirname, "../data/usersDB.json"), userJSON)

        //         res.redirect("/user/login")
        //     } else {
        //         res.render(path.resolve(__dirname, "../views/user/register.ejs"))
        //     }} else {
        //         res.render(path.resolve(__dirname, "../views/user/register.ejs"), { errors: errors.mapped(), old: req.body })
        //     }

    },
    
    // Ruta que muestra login
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/log_in"))
    },

    // Ruta que procesa login
    connect: (req, res) => {

        //let errors = validationResult(req);

        //if(errors.isEmpty()){
            let user;
            let userToBeLogged = db.User.findAll()
                .then((users) =>{
                    for(let i = 0; i < users.length; i++){                    
                         if(users[i].email == req.body.emailLogin /*|| users[i].username == req.body.emailLogin*/){
                            if(req.body.passwordLogin == users[i].password/*bcrypt.compareSync(req.body.passwordLogin, users[i].password)*/){
                                userToBeLogged = users[i];
                                user = userToBeLogged;
                                break;
                            } else{console.log(req.body.passwordLogin)}
                      }
                     }
                    // if(user == undefined){ console.log("usuario indefinido")
                    //     // return res.render(path.resolve(__dirname, "../views/user/log_in"),
                    //     // {errors: { emailLogin: { msg: 'Las credenciales son inválidas'}}}
                    //     // )
                    // }

                    req.session.userLogged = user

                    if(req.body.rememberme){
                        res.cookie("rememberme", userToBeLogged.email, {maxAge:10*10*60000})
                    }

                    res.redirect(path.resolve(__dirname, "../views/user/profileUser"))
                });


        // } else {
        //     res.render(path.resolve(__dirname, "../views/user/log_in"), {
        //         errors: errors.mapped(),
        //         oldData: req.body
        //     });
        // }

        // Metodo con JSON
        // let userEmpty = req.body.emailLogin

        // let userToLogin = db.User.findByField("Mail", req.body.emailLogin);

        // let errors = validationResult(req);

        // // Si no se carga un correo electronico
        // if(userEmpty == ""){
        //     res.render(path.resolve(__dirname, "../views/user/log_in.ejs"), { errors: errors.mapped(), old: req.body })}

        // // Si el correo electronico cargado no se encuentra en nuestra base de datos
        // if(!userToLogin){
        //     return res.render(path.resolve(__dirname, "../views/user/log_in.ejs"), {
        //         errors: {
        //             emailLogin: { msg: "Correo electrónico no registrado en nuestra base de datos"}
        //         }
        //     })
        // }

        // // Si no hay errores de validacion
        // if (errors.isEmpty()){
        //     let archivoUsuario = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        //     let usuarios;

        //     if (archivoUsuario == "") {
        //         usuarios = []; } 
        //     else {
        //         usuarios = JSON.parse(archivoUsuario);
        //     }


            
        //     for (let i = 0; i < usuarios.length; i++) {
        //         if (usuarios[i].Mail == req.body.emailLogin){
        //             if (bcrypt.compareSync(req.body.passwordLogin, usuarios[i].Contraseña)){
        //                 usuarioALoguearse = usuarios[i];
        //                 break;
        //             }
        //             else {
        //                 return res.render(path.resolve(__dirname, "../views/user/log_in.ejs"), {
        //                     errors: {
        //                         emailLogin: { msg: "Credenciales invalidas"}
        //                     }
        //                 })
        //             }
        //         }
        //     }
        //     if(usuarioALoguearse == undefined) {
        //         return res.render(path.join(__dirname, "../views/user/log_in.ejs"));} 
        //     else {     
        //         //delete usuarioALoguearse.Contraseña   
        //         req.session.usuarioLogueado = usuarioALoguearse;

        //         if(req.body.rememberme != undefined){
        //             res.cookie("rememberme", usuarioALoguearse.Mail, {maxAge: 60000})
        //         }
        //         res.redirect("/user/profile")
        //     }} 
        // //else {res.render(path.resolve(__dirname, "../views/user/log_in.ejs"), { errors: errors.mapped(), old: req.body })}
    },

    // Ruta que muestra edicion
    edit: (req, res) =>{
        return res.render(path.resolve(__dirname, "../views/user/editUser"), {user: req.session.usuarioLogueado})

        // Metodo con JSON
        // let users = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        // users = JSON.parse(users)
        // let user = users.find(user => user.id == req.params.id);

        // res.render((path.resolve(__dirname, "../views/user/editUser")), {user})
    },

    // Ruta que procesa la edicion
    update: (req, res) => {
        let image;
        db.User.findByPK(req.params.id)
        .then(user => {
            image= user.avatar;
            if(req.file){ image = req.file.filename }
        
        db.User.update({
            name: req.body.name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.mail,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            avatar: image,
        },{where: {id_user: req.params.id}})

        return res.redirect("/")
        }).catch(error => console.log(error))

    //     let idUser = req.params.id
    //     let readUser = fs.readFileSync(path.resolve(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
    //     let users = JSON.parse(readUser)

    //     users.forEach(user => {
    //         if (user.id == idUser) {
    //             user.Nombre = req.body.name,
    //             user.Apellido = req.body.last_name,
    //             user.User = req.body.user,
    //             user.Avatar = req.file.filename,
    //             user.Mail = req.body.mail,
    //             Contraseña= req.body.password

    //         }
    //     })

    //     let updateUser = JSON.stringify(users, null, " ")
    //     fs.writeFileSync(path.join(__dirname, "../data/usersDB.json"), updateUser)

    //     res.redirect("/")
     },

    profile: (req, res) => {
        return res.render(path.resolve(__dirname, "../views/user/profileUser.ejs"), 
        {user: req.session.userLogged}) 
    },


    destroy: (req, res) => { // User Destroy, not logout
        db.User.destroy({
            where: {id_user: req.params.id}
        })
        res.localstorage.clear();
        res.clearCookie("rememberme");
        req.logout();
        req.session.destroy();
        res.redirect("/")

        // Metodo con JSON
        // let users = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), { encoding: "utf-8" });
        // users = JSON.parse(users);
        // let eraseUser = users.filter(user => user.id != req.params.id)
        // eraseUser = JSON.stringify(eraseUser, null, 4);

        // fs.writeFileSync(path.join(__dirname, "../data/usersDB.json"), eraseUser);
        
        // res.redirect('/');
    },

    logout: (req, res) => {
        res.clearCookie("rememberme");
        req.session.destroy();
        return res.redirect("/")
    }

} 

module.exports = userController