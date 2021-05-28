const path = require("path")

let mainController = {
    home: (req, res) => {
        res.render(path.resolve(__dirname, "../views/home"))
    },
    contact_us: (req, res) => {
        res.render(path.resolve(__dirname, "../views/contact_us"))
    },
    log_in: (req, res) => {
        res.render(path.resolve(__dirname, "../views/log_in"))
    },
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/register"))
    },
};


module.exports = mainController;