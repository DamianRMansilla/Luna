function cookieAuthMiddleware (req, res, next){
    next();
    
    if (req.cookies.rememberme != undefined && req.session.usuarioLogueado == undefined) {
        let archivoUsuario = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), {encoding: "utf-8"})
        let usuarios;

        if (archivoUsuario == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUsuario);
        }

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].Mail == req.cookies.rememberme){
                    usuarioALoguearse = usuarios[i];
                    break;
                }
            }
        req.session.usuarioLogueado == usuarioALoguearse;
    }
}

module.exports = cookieAuthMiddleware