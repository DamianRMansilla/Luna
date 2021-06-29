const path = require("path")


let mainController = {
    home: (req, res) => {
        res.render(path.resolve(__dirname, "../views/home"))
    },
    contact_us: (req, res) => {
        res.render(path.resolve(__dirname, "../views/contact_us"))
    },

    search: (req, res) => {
        let searched = req.query.busqueda;

        let sweaters = [
            {
                id: 1,
                nombre: "Canelón",
                precio: "2.220",
                descripcion: "Tejido de punto. Basico redondo con terminaciones en canalé.",
                talles: 1 - 2 - 3,
                cantidad: 8,
            },
            {
                id: 2,
                nombre: "Jacinta",
                precio: "5.000",
                descripcion: "Alto sweater.",
                talles: 1 - 2 - 3 - 4,
                cantidad: 6,
            },
            {
                id: 3,
                nombre: "Pancracia",
                precio: "1.000",
                descripcion: "Alto sweater.",
                talles: 1 - 2 - 3 - 4,
                cantidad: 6,
            },
            {
                id: 4,
                nombre: "Lucerna",
                precio: "4.000",
                descripcion: "Alto sweater.",
                talles: 1 - 2 - 3 - 4,
                cantidad: 6,
            },
        ];

        let results = [];
        for(let i = 0; i < sweaters.length; i++) {
            if (sweaters[i].nombre.includes(searched)){
                results.push(sweaters[i])
            }}
        res.render(path.resolve(__dirname, "../views/search"), {searched, results})
    },
};


module.exports = mainController;