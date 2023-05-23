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

router.post('/register'), async(req, res)=>{
    const {first_name, last_name, email, password} = req.body
    if (first_name == null || last_name == null || email == null || password == null) return res.send('los campos estan vacios')
    const existUser = await userModel.findOne({email})
    if (existUser) res.send ({status: 'error', message:'El mail ya esta registrado'})
    const newUser = {
        first_name,
        last_name,
        email,
        password
    }
    let result = await userModel.create(newUser)
    res.status(200).send({status: 'success', message: 'Usuario creado', result})
}   

router.post('/login', async(req, res)=> {
    const {email, password} = req.body
    /*if (email!=='adminCoder@coder.com' || password!== 'adminCod3r123') {
        return res.send('login failed')
    }*/
    const existUser = await userModel.findOne({email, password})
    if(!existUser) return res.send({status: 'error', message: 'El mail no se encuentra registrado'})
    
    req.session.user = {first_name: existUser.first_name,
                        email: existUser.email}

    //req.session.admin = true

    let page = 1
    let sort = "asc"
    let result = await productModel.paginate({},{page,sort, lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8050/api/sessions/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8050/api/sessions/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('products',result)
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})


module.exports = router