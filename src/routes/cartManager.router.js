const {Router}= require ('express')
const router = Router()
const cartManager = require('../dao/cart.mongo')
const productManager = require('../dao/product.mongo')

//GET
router.get('/', async(req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).send({
            status: 'success',
            payload: carts
        })
    }catch(error){
        return new Error(error)
    }
})

router.get('/:cid', async(req, res) => {
    try {
        const {cid} = req.params
        let cart = await cartManager.getCartstById(cid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })
    }catch(error){
        return new Error(error)
    }
})

//------------------------------------------------
//POST
router.post('/', async(req, res) => {
    try {
        //const newProduct = req.body
        let result = await cartManager.addCart()
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        return new Error(error)
    }

})

//PUT
router.put('/:cid/product/:pid', async(req, res) =>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        let product = await productManager.getProductById(pid)
        //console.log(product)
        if (product !== null) {
            let result = await cartManager.updateCart(cid, pid)
            res.status(200).send({
                status: 'success',
                payload: result})
        }else{
            res.status(400).send({
                status: 'Error',
                payload: "El producto no existe"})
        }
    } catch(error) {
        return new Error(error)
    }
})

//------------------------------------------------
//DELETE
router.delete('/:cid', async(req, res) =>{
    try {   
        const { cid } = req.params
        await cartManager.deleteCart({cid})
        res.send({
            status: 'success',
            payload: `Carrito id: ${cid} fue eliminado`
        })
    } catch (error) {
        return new Error(error)
    }
})
module.exports = router