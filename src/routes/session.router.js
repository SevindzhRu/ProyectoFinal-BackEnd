const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const { productModel } = require("../dao/models/products.model")
const { userModel } = require('../dao/models/users.model')
const router = Router()



router.get('/login', (req, res)=>{
    res.render('login', {})
})

router.get('/register', (req, res)=>{
    res.render('register', {})
})

router.get('/privada', auth,(req,res) => {

    res.send('Esta sección solo puede ver un admin logueado')
})

router.post('/register', async(req, res)=>{
    const {first_name, last_name, email, password} = req.body

    if (first_name == "" || last_name == "" || email == "" || password == ""){
        return res.status(404).send({message:"complete los campos que faltan"})
    }

    const userEmail = await userModel.findOne({email})
    if (userEmail) {
        return res.status(404).send({status: "error", message: "El email ya existe"})
     }

    const newUser = {
        first_name, last_name, email, password
    }

    await userModel.create(newUser)

    res.status(200).send({ message: `El usuario ${first_name} ${last_name} se ha creado con exito`})
    
})


router.post('/login', async(req, res)=> {
    const {email, password} = req.body

    const userDB = await userModel.findOne({email})
    const userPassword = await userModel.findOne({password})

    if(!userDB) return res.status(404).send({status: "error", message: "Este email no existe"})
    if(!userPassword) return res.status(404).send({status: "error", password: "Password invalido"})

    // let role = "user"

    // if(email === "adminCoder@Coder.com" && password === "adminCoder123") role = "admin"

    req.session.user = {
        firstName: userDB.first_name,
        lastName: userDB.last_name,
        email: userDB.email,
        role: userDB.role
    }

    if (email === "adminCoder@coder.com" && password === "adminCoder123") {
        req.session.user.role = "admin";
    } else {
        req.session.user.role = "user";
    }

    console.log(req.session.user)

    res.redirect("/api/products")
    })





    // let page = 1
    // let sort = "asc"
    // let result = await productModel.paginate({},{page,sort, lean:true})
    // result.prevLink = result.hasPrevPage?`http://localhost:8050/api/sessions/products?page=${result.prevPage}`:'';
    // result.nextLink = result.hasNextPage?`http://localhost:8050/api/sessions/products?page=${result.nextPage}`:'';
    // result.isValid= !(page<=0||page>result.totalPages)
    // res.render('products',result)


router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})


module.exports = router