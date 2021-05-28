const express = require("express");
const app = express();
const path = require("path");
const rutasProductos = require("./src/routes/products.js");
const rutasMain = require("./src/routes/main.js");

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static("./public"))

app.set("view engine", "ejs")
//app.set("views", path.join(__dirname, "views"));

app.use("/products", rutasProductos);
app.use("/", rutasMain);



app.listen(3090, ()=>{
    console.log("Servidor corriendo en el puerto 3090");
})
