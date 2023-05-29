// function auth(req,res,next){
//     if(req.session?.user?.email !== 'adminCoder@coder.com' || !req.session?.user?.admin === 'admin'){
//         return res.status(401).send('error de autenticacion')
//     }
//     next()
// }

function auth(req, res, next) {
    if (req.session?.user?.role !== "admin") {
        if (req.session.user) {
            return res.redirect("/profile");
        } else {
            return res.redirect("/login");
        }
    }
    next();
}



module.exports = {
    auth
}

