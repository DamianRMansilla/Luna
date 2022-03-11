let db = require("../database/models")

function loggedUserMiddleware (req, res, next) {
    res.locals.isLogged = false;

    if(req.cookies && req.cookies.rememberme){
        let emailInCookie = req.cookies.rememberme;
        db.User.findOne({
            where: {email: emailInCookie}
        })
        .then(function(userFromCookie){
            req.session.userLogged = userFromCookie
        })}
    
    if(req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        console.log(res.locals.userLogged)
    }

    next();
}

module.exports = loggedUserMiddleware