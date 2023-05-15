const {Router}= require ('express')
const router = Router()
const productManager = require('../src/dao/product.mongo.js')


const socketProducts = async(io) =>{
    const products = await productManager.getProducts()
    io.on('connection', socket =>{
        console.log('Cliente conectado')
        socket.emit('productos', products)
    })
}

module.exports = {socketProducts}