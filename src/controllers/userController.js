const path = require("path");
const fs = require("fs")
const { writeFileSync } = require("fs");


let userController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/register"))
    },
    
    newUser: (req, res) => {
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
            Mail: req.body.mail,
            Contraseña: req.body.password,
        }

        users.push(userList)

        let userJSON = JSON.stringify(users, null, " ")
        fs.writeFileSync(path.resolve(__dirname, "../data/usersDB.json"), userJSON)

        res.redirect("/user/login")

    },
    
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/user/log_in"))
    },

    connect: (req, res) => {

    },

    edit: (req, res) =>{

    },

    change: (req, res) => {
        
    }

} 

module.exports = userController