const path = require("path")
const fs = require("fs")

const user = {

    getData: function() {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,"../src/data/usersDB.json"), "utf-8"));
    },

    findAll: function () {
        return this.getData();
    },

    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] == text);
        return userFound;
    }
}

//console.log(user.findByField("Mail","lea.arizaga@gmail.com"))


module.exports = user