const { writeFileSync } = require("fs");
const path = require("path");
let fs = require("fs");
let db = require("../../database/models");

let productsController = {

    products: (req, res) => {
        listaProductos = db.Producto.findAll();
        listadoMarcas = db.Marca.findAll();
        listadoColores = db.Color.findAll();
        listadoTalles = db.Talle.findAll();
        listadoCategorias = db.Categoria.findAll()

        Promise.all([listaProductos, listadoMarcas, listadoColores, listadoTalles, listadoCategorias])
            .then(function([productos, marcas, colores, talles, categorias]){
                return res.render(path.resolve(__dirname, "../views/product/products"), {productos, marcas, colores, talles, categorias})
            })

            .catch(function (err) {
                console.log("no se muestran los productos", err)});
        
        //res.render(path.resolve(__dirname, "../views/product/products"))
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
    
    
    new: (req, res) => {
        let listadoMarcas = db.Marca.findAll()
        let listadoCategorias = db.Categoria.findAll()
        let listadoColores = db.Color.findAll()
        let listadoTalles = db.Talle.findAll()
    
        Promise.all([listadoMarcas, listadoCategorias, listadoColores, listadoTalles])
            .then(function([marcas, categorias, colores, talles]){
                return res.render(path.resolve(__dirname, "../views/product/new_product"), {marcas, categorias, colores, talles})
            })
    },
    
    create: (req, res) => {
        db.Producto.create({
            producto: req.body.name_product,
            idcategoria_producto: req.body.category_product,
            idcolor: req.body.color_product,
            idmarca: req.body.brand_product,
            precio: req.body.price_product,
            descripcion: req.body.descript_product,
            idtalle: req.body.size_product,
            cantidad_stock: req.body.quantity_product,
            imagen: req.file.filename,
            nuevoIngreso: req.body.newIn
        })

        .catch(function (err) {
          console.log("no se creo el producto", err)});

        res.redirect("/")

    //      Creacion del producto en JSON:

    //     let readSweater = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
    //     let sweater;
    //     if (readSweater == "") { sweater = [] }
    //     else { sweater = JSON.parse(readSweater)}

    //     const lastID = () => {
    //         let ultimo = 0;
    //         sweater.forEach(oneProduct => {
    //             if (ultimo < oneProduct.id) {
    //                 ultimo = oneProduct.id;
    //             }});
    //         return ultimo;
    //     }
        
    //     let prod_sweater = {
    //         id: lastID() + 1,
    //         Tipo_de_producto: req.body.producto,
    //         Nombre: req.body.name_product,
    //         Precio: req.body.price_product,
    //         Descripcion: req.body.descript_product,
    //         Talle_36: req.body.talle_jean_36,
    //         Talle_38: req.body.talle_jean_38,
    //         Talle_40: req.body.talle_jean_40,
    //         Talle_42: req.body.talle_jean_42,
    //         Talle_44: req.body.talle_jean_44,
    //         Talle_46: req.body.talle_jean_46,
    //     };

    //     sweater.push(prod_sweater)
    //     let sweaterJSON = JSON.stringify(sweater, null, " ")
    //     fs.writeFileSync(path.resolve(__dirname,"../data/productsDatabase.json"), sweaterJSON)
        
    //     res.redirect("/products/new")
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
