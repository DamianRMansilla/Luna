const { writeFileSync } = require("fs");
const path = require("path")
let fs = require("fs")


let productsController = {

    products: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/products"))
    },


    trousers: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/trousers"))
    },


    tshirt: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/tshirt"))
    },


    sweater: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/sweater"))
    },


    create: (req, res) => {
        
        let readSweater = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
        let sweater;
        if (readSweater == "") { sweater = [] }
        else { sweater = JSON.parse(readSweater)}

        const lastID = () => {
            let ultimo = 0;
            sweater.forEach(oneProduct => {
                if (ultimo < oneProduct.id) {
                    ultimo = oneProduct.id;
                }
            });
            return ultimo;
        }
        
        let prod_sweater = {
            id: lastID() + 1,
            Tipo_de_producto: req.body.producto,
            Nombre: req.body.name_product,
            Precio: req.body.price_product,
            Descripcion: req.body.descript_product,
            Talle_36: req.body.talle_jean_36,
            Talle_38: req.body.talle_jean_38,
            Talle_40: req.body.talle_jean_40,
            Talle_42: req.body.talle_jean_42,
            Talle_44: req.body.talle_jean_44,
            Talle_46: req.body.talle_jean_46,
        };


        
        sweater.push(prod_sweater)

        let sweaterJSON = JSON.stringify(sweater, null, " ")
        fs.writeFileSync(path.resolve(__dirname,"../data/productsDatabase.json"), sweaterJSON)
        
        res.redirect("/products/new")
    },

    sweaterID: (req, res) => {
        let productsDatabase = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), { encoding: "utf-8" });
        products = JSON.parse(productsDatabase);
        oneProduct = products.find(product => req.params.id == product.id);
        res.render(path.resolve(__dirname, "../views/product/sweater_num.ejs"), {"product": oneProduct});
    },


    new_in: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/new_in"))
    },


    new: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/new_product"))
    },


    edit: (req, res) => {
        let products = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
        products = JSON.parse(products)
        let product = products.find(product => product.id == req.params.id);

        res.render((path.resolve(__dirname, "../views/product/edit_product")), {product})
    }, 

    update: (req, res) => {
        let idProducto = req.params.id
        let readSweater = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
        let products = JSON.parse(readSweater)



        products.forEach(product => {
            if(product.id == idProducto){
                product.Tipo_de_producto = req.body.producto;
                product.Nombre = req.body.name_product;
                product.Precio = req.body.price_product;
                product.Descripcion = req.body.descript_product;
                product.Talle_36 = req.body.talle_jean_36;
                product.Talle_38 = req.body.talle_jean_38;
                product.Talle_40 = req.body.talle_jean_40;
                product.Talle_42 = req.body.talle_jean_42;
                product.Talle_44 = req.body.talle_jean_44;
                product.Talle_46 = req.body.talle_jean_46;
            }
        });

        let newProducts = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/productsDatabase.json"), newProducts);

        res.redirect("/")
    },


    delete: (req, res) => {
        let products = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), { encoding: "utf-8" });
        products = JSON.parse(products);
        let newProducts = products.filter(product => product.id != req.params.id)
        newProducts = JSON.stringify(newProducts, null, 4);

        fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), newProducts);
        
        res.redirect('/');
    },
};





module.exports = productsController;
