const {Router} = require('express')
const router = Router()
const productManager = require('../dao/product.mongo.js')
const { productModel } = require('../dao/models/products.model')


//GET
router.get('/', async(req, res) => {
    try {
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let sort = req.query.sort
        let sortType = {}
        if(!page) page = 1
        if(!limit) limit = 5
        if(sort === 'asc'){
            sortType = {price: 1}
        } else if (sort === 'desc'){
            sortType = {price: -1}
        }
        const products =  await productModel.paginate({},{page,limit,sort, lean:true})
        res.status(200).send({
            status: 'success',
            payload: products
        })
    }catch(error){
        return new Error(error)
    }
})

router.get('/:pid', async(req, res) => {
    try {
        const {pid} = req.params
        let product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    }catch(error){
        return new Error(error)
    }
})

//POST
router.post('/', async(req, res) => {
    try {
        const newProduct = req.body
        let result = await productManager.addProduct(newProduct)
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        return new Error(error)
    }

})

//PUT
router.put('/:pid', async(req, res) =>{
    try{
        const { pid } = req.params
        const newProduct = req.body
        let result = await productManager.updateProduct(pid, newProduct)
        res.status(200).send({
            status: 'success',
            payload: result})
    } catch(error) {
        return new Error(error)
    }
})

//DELETE
router.delete('/:pid', async(req, res) =>{
    try {   
        const { pid } = req.params
        await productManager.deleteProduct(pid)
        res.status(200).send({
            status: 'success',
            payload: `Producto id: ${pid} fue eliminado`
        })
    } catch (error) {
        return new Error(error)
    }
})

module.exports = router