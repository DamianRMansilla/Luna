const express = require("express");
const app = express();
const path = require("path");

const publicPath = path.resolve(__dirname, "../public");
const methodOverride = require("method-override");

let session = require("express-session")

app.set("view engine", "ejs")

app.use(express.static("./public"))
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const rutasMain = require("./src/routes/main.js");
const rutasProductos = require("./src/routes/products.js");
const rutasUser = require("./src/routes/users.js");
const logMiddleware = require("./middleware/logMiddleware");
const cookieParser = require("cookie-parser");
const cookieAuthMiddleware = require("./middleware/cookieAuthMiddleware");
const loggedUserMiddleware = require("./middleware/loggedUserMiddleware")

app.use(logMiddleware)
app.use(session({secret: "Shh, es un secreto", resave: false, saveUninitialized: true}));
app.use(cookieParser());
app.use(cookieAuthMiddleware)
app.use(loggedUserMiddleware)


app.use("/", rutasMain);
app.use("/products", rutasProductos);
app.use("/user", rutasUser);
app.use((req, res, next) => {
    res.status(404).render(path.resolve(__dirname, "./src/views/not-found.ejs"))
});



app.listen(3090, ()=>{
    console.log("Servidor corriendo en el puerto 3090");
})
