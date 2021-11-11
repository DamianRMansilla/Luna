function guestMiddleware (req, res, next){
    if(req.session.usuarioLogueado == undefined){
        next();
    } else {
        res.redirect("/user/profile")
    }
}

module.exports = guestMiddleware