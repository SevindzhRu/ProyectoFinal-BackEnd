const {Router} = require('express')
const router = Router()
const productManager = require('../dao/product.mongo.js')

router.get('/chat', (req, res)=>{
    res.render('chat', {})
  })
  
  router.get('/', async(req, res) =>{   
    await productManager.getProducts() // <=> wrapper for Model.find() ...
      .then(documents => {
        // create context Object with 'usersDocuments' key
        const context = {
          usersDocuments: documents.map(document => {
            return {
              title: document.title,
              description: document.description,
              price: document.price,
              thumbnails: document.thumbnails,
              stock: document.stock,
              code: document.code
            }
          })
        }
        // rendering usersDocuments from context Object
        res.render('home', {
          usersDocuments: context.usersDocuments
        })
      })
      .catch(error => res.status(500).send(error))
  
  
  
  })
  
  router.get('/realtimeproducts', async(req, res) =>{ 
      //const prodList =  await producto.getProducts()
      /*const prodList = await productManager.getProducts()
      let datosProd = {
          listaProductosLive: prodList
      }
      res.render('realTimeProducts', {datosProd})*/
  //--------------------------------------------------------------------------------------
  await productManager.getProducts() // <=> wrapper for Model.find() ...
  .then(documents => {
    // create context Object with 'usersDocuments' key
    const context = {
      usersDocuments: documents.map(document => {
        return {
          title: document.title,
          description: document.description,
          price: document.price,
          thumbnails: document.thumbnails,
          stock: document.stock,
          code: document.code
        }
      })
    }
    // rendering usersDocuments from context Object
    res.render('realTimeProducts', {
      usersDocuments: context.usersDocuments
    })
  })
  .catch(error => res.status(500).send(error))
  
  })
  
  module.exports = router