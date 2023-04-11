const {
    Router
} = require('express')
const router = Router()
const {
    ProductManager
} = require('../ProductManager.js')
const producto = new ProductManager()

//GET
router.get('/', async (req, res) => {
    const prod = await producto.getProducts()
    const limit = req.query.limit
    if (!limit)
        return res.send(prod)
    res.send(prod.slice(0, limit))
})

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const prod = await producto.getProductById(id)
    if (!prod)
        return res.send({
            error: 'No se encuentra el producto'
        })
    res.send(prod)
})

//POST
router.post('/', async (req, res) => {
    let prod = req.body
    if (!prod.title || !prod.description) {
        return res.status(400).send({
            status: 'error',
            messaje: 'Todos los campos son necesarios'
        })
    }
    res.send({
        status: "Sucess",
        messaje: await producto.addProduct(prod)
    })
})

//PUT
router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const prod = req.body
    await producto.updateProduct(pid, prod)
    res.send(producto)
})

//DELETE
router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    res.send({
        status: "Success",
        message: await producto.deleteProduct(pid)
    })
})

module.exports = router