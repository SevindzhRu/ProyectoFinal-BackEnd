const express = require('express')
const handlebars = require('express-handlebars')

// Import de los routes de la api
const productsRouter = require ('./routes/products.router')
const cartRouter = require ('./routes/cartManager.router')
const viewStatic = require ('./routes/views.router')

// Import de Server
const { Server } = require('socket.io') 
const {socketProducts} = require ('../public/js/socketproducts')

const app = express()
const PORT = 8050

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use('/', viewStatic)
app.use('/realtimeproducts', viewStatic)


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//con _dirname tenemos la ruta absoluta
app.use(express.static(__dirname +'/public'))

const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto: ${PORT}`)
})
const io = new Server(httpServer)

// http://localhost:8050/api/products
app.use('/api/products', productsRouter)

// http://localhost:8050/api/carts
app.use('/api/carts', cartRouter)

socketProducts(io)



