function auth(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/')
    }
}

function isLogged(req,res,next){
    if(req.session.logged){
        res.redirect('/views/products')
    } else{
        next()
    }
}

module.exports = {
    auth,
    isLogged
}