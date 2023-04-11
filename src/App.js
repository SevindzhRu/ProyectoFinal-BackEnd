const express = require('express')

// Importamos los routes de la api
const productsRouter = require ('./routes/products.router')
const cartRouter = require ('./routes/cartManager.router')
const app = express()
const PORT = 8050


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//con _dirname tenemos la ruta absoluta
app.use(express.static(__dirname +'/public'))


// http://localhost:8050/api/products
app.use('/api/products', productsRouter)

// http://localhost:8050/api/carts
app.use('/api/carts', cartRouter)


app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto: ${PORT}`)
})

