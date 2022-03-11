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
        
    },


    detail: (req, res) =>{
        db.Producto.findByPk(req.params.id, {
            include: [{association: "marca"}, {association: "color"}, {association: "categoria"}, {association: "talle1"}, 
            {association: "talle2"}, {association: "talle3"}, {association: "talle4"}, {association: "talle5"}, {association: "talle6"}]
        })
            .then(function(producto){
                res.render(path.resolve(__dirname, "../views/product/productDetail"), {producto})
            })

            .catch(function (err) {
                console.log("no se muestra el producto", err)});
    },


    trousers: (req, res) => {
        listaProductos = db.Producto.findAll();
        listadoMarcas = db.Marca.findAll();
        listadoColores = db.Color.findAll();
        listadoTalles = db.Talle.findAll();
        listadoCategorias = db.Categoria.findAll()

        Promise.all([listaProductos, listadoMarcas, listadoColores, listadoTalles, listadoCategorias])
            .then(function([productos, marcas, colores, talles, categorias]){
                return res.render(path.resolve(__dirname, "../views/product/trousers"), {productos, marcas, colores, talles, categorias})
            })

            .catch(function (err) {
                console.log("no se muestran los productos", err)});
    },

    trousersID: (req, res) => {
    //     listaProductos = db.Producto.findAll()
    //     listadoMarcas = db.Marca.findAll();
    //     listadoColores = db.Color.findAll();
    //     listadoTalles = db.Talle.findAll();
    //     listadoCategorias = db.Categoria.findAll()

    //     Promise.all([listaProductos, listadoMarcas, listadoColores, listadoTalles, listadoCategorias])
    //     Promise.all([listaProductos])
        
    //     .then(function([listaProductos]){
    //         for(let i = 0; i < listaProductos.length; i++){
    //             res.send(listaProductos[i])
    //             console.log(listaProductos[i])
    //             if(listaProductos[i].idcategoria_producto == 1){
    //                 db.Producto.findByPk(req.params.id)
    //                     .then(function(trouser){
    //                         res.render(path.resolve(__dirname, "../views/product/trousers"), {trouser})
    //                     })        
                    
                
    //         }
    //     }}
    //         )
    //     .catch(function (err) {
    //             console.log("no se muestran los productos", err)});


     },


    tshirt: (req, res) => {
        listaProductos = db.Producto.findAll();
        listadoMarcas = db.Marca.findAll();
        listadoColores = db.Color.findAll();
        listadoTalles = db.Talle.findAll();
        listadoCategorias = db.Categoria.findAll()

        Promise.all([listaProductos, listadoMarcas, listadoColores, listadoTalles, listadoCategorias])
            .then(function([productos, marcas, colores, talles, categorias]){
                return res.render(path.resolve(__dirname, "../views/product/tshirt"), {productos, marcas, colores, talles, categorias})
            })

            .catch(function (err) {
                console.log("no se muestran los productos", err)});
    },

    tshirtID: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/tshirt"))
    },
    

    sweater: (req, res) => {
        listaProductos = db.Producto.findAll();
        listadoMarcas = db.Marca.findAll();
        listadoColores = db.Color.findAll();
        listadoTalles = db.Talle.findAll();
        listadoCategorias = db.Categoria.findAll()

        Promise.all([listaProductos, listadoMarcas, listadoColores, listadoTalles, listadoCategorias])
            .then(function([productos, marcas, colores, talles, categorias]){
                return res.render(path.resolve(__dirname, "../views/product/sweater"), {productos, marcas, colores, talles, categorias})
            })

            .catch(function (err) {
                console.log("no se muestran los productos", err)});
    },
    
    sweaterID: (req, res) => {
        let productsDatabase = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), { encoding: "utf-8" });
        products = JSON.parse(productsDatabase);
        oneProduct = products.find(product => req.params.id == product.id);
        res.render(path.resolve(__dirname, "../views/product/sweater_num.ejs"), {"product": oneProduct});
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
            idtalle1: req.body.size_product1,
            idtalle2: req.body.size_product2,
            idtalle3: req.body.size_product3,
            idtalle4: req.body.size_product4,
            idtalle5: req.body.size_product5,
            idtalle6: req.body.size_product6,
            cantidad_stock1: req.body.quantity_product1,
            cantidad_stock2: req.body.quantity_product2,
            cantidad_stock3: req.body.quantity_product3,
            cantidad_stock4: req.body.quantity_product4,
            cantidad_stock5: req.body.quantity_product5,
            cantidad_stock6: req.body.quantity_product6,
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


    new_in: (req, res) => {
        res.render(path.resolve(__dirname, "../views/product/new_in"))
    },


    edit: (req, res) => {
        let productID = req.params.id;
        let productToEdit = db.Producto.findByPk(productID);
        let listadoMarcas = db.Marca.findAll()
        let listadoCategorias = db.Categoria.findAll()
        let listadoColores = db.Color.findAll()
        let listadoTalles = db.Talle.findAll()

        Promise.all([productToEdit, listadoMarcas, listadoCategorias, listadoColores, listadoTalles])
            .then(function([product, marcas, categorias, colores, talles]){
                res.render(path.resolve(__dirname, "../views/product/editProduct"), {productID, product, marcas, categorias, colores, talles})
            })

        // Metodo editar en JSON
        // let products = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
        // products = JSON.parse(products)
        // let product = products.find(product => product.id == req.params.id);

        // res.render((path.resolve(__dirname, "../views/product/editProduct")), {product})
    }, 

    update: (req, res) => {
        db.Producto.update({
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
        } , {
            where: {
                id_productos: req.params.id
            }
        });

        res.redirect("/products/" + req.params.id)

        // Logica update en JSON:

        // let idProducto = req.params.id
        // let readSweater = fs.readFileSync(path.resolve(__dirname, "../data/productsDatabase.json"), {encoding: "utf-8"})
        // let products = JSON.parse(readSweater)



        // products.forEach(product => {
        //     if(product.id == idProducto){
        //         product.Tipo_de_producto = req.body.producto;
        //         product.Nombre = req.body.name_product;
        //         product.Precio = req.body.price_product;
        //         product.Descripcion = req.body.descript_product;
        //         product.Talle_36 = req.body.talle_jean_36;
        //         product.Talle_38 = req.body.talle_jean_38;
        //         product.Talle_40 = req.body.talle_jean_40;
        //         product.Talle_42 = req.body.talle_jean_42;
        //         product.Talle_44 = req.body.talle_jean_44;
        //         product.Talle_46 = req.body.talle_jean_46;
        //     }
        // });

        // let newProducts = JSON.stringify(products, null, 4);
        // fs.writeFileSync(path.join(__dirname, "../data/productsDatabase.json"), newProducts);

        // res.redirect("/")
    },


    delete: (req, res) => {
        db.Producto.destroy({
            where: {
                id_productos: req.params.id
            }
        })

        res.redirect("/products")

        // let products = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), { encoding: "utf-8" });
        // products = JSON.parse(products);
        // let newProducts = products.filter(product => product.id != req.params.id)
        // newProducts = JSON.stringify(newProducts, null, 4);

        // fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), newProducts);
        
        // res.redirect('/');
    },
};





module.exports = productsController;
