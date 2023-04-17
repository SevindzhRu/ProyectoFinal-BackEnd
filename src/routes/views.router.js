const {Router} = require('express')
const router = Router()
const { ProductManager }  = require('../ProductManager.js')
const producto = new ProductManager()

router.get('/', async(req, res) =>{
    
    const prodList =  await producto.getProducts()

    let datosProd = {listaProductos: prodList}
    res.render('home', datosProd)
})

router.get('/realtimeproducts', async(req, res) =>{
    try{
        const prodList =  await producto.getProducts()
    
        let datosProd = {listaProductosLive: prodList}
        res.render('realTimeProducts', datosProd)

    }
    catch(error){
        console.log(error)}
})

module.exports = router