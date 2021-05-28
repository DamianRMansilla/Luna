const path = require("path")

let productsController = {
    products: (req, res) => {
        res.render(path.resolve(__dirname, "../views/products"))
    },
    trousers: (req, res) => {
        res.render(path.resolve(__dirname, "../views/trousers"))
    },
    tshirt: (req, res) => {
        res.render(path.resolve(__dirname, "../views/tshirt"))
    },
    new_in: (req, res) => {
        res.render(path.resolve(__dirname, "../views/new_in"))
    },
};


module.exports = productsController;