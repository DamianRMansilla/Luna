const express = require("express");
const app = express();
const path = require("path");

const publicPath = path.resolve(__dirname, "../public");
const methodOverride = require("method-override");


app.set("view engine", "ejs")
//app.set("views", path.join(__dirname, "views"));

app.use(express.static("./public"))
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const rutasMain = require("./src/routes/main.js");
const rutasProductos = require("./src/routes/products.js");
const rutasUser = require("./src/routes/users.js");

app.use("/", rutasMain);
app.use("/products", rutasProductos);
app.use("/user", rutasUser);


//app.use((req, res, next) => {
    //res.status(404).render("not found")
//})

app.listen(3090, ()=>{
    console.log("Servidor corriendo en el puerto 3090");
})
