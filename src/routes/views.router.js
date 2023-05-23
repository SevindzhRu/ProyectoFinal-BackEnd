const {Router} = require('express')
const router = Router()
const { productModel } = require("../dao/models/products.model")
const { cartModel } = require('../dao/models/carts.model')


router.get('/carts/:cid', async(req, res) =>{   
  const { cid } = req.params
  let result = await cartModel.findById(cid).lean()
  res.render('cart',result)
})
  
  module.exports = router