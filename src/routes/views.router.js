const {Router} = require('express')
const router = Router()
const { productModel } = require("../dao/models/products.model")
const { cartModel } = require('../dao/models/carts.model')


router.get('/products', async(req, res) =>{   
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let sort = req.query.sort
  //Validaciones del Query-------------
  if(!page) page = 1
  if(!limit) limit = 4
  if(!sort ) sort = "asc"
  let result = await productModel.paginate({},{page,limit,sort, lean:true})
  result.prevLink = result.hasPrevPage?`http://localhost:8050/products?page=${result.prevPage}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8050/products?page=${result.nextPage}`:'';
  result.isValid= !(page<=0||page>result.totalPages)
  res.render('products',result)
})

router.get('/carts/:cid', async(req, res) =>{   
  const { cid } = req.params
  let result = await cartModel.findById(cid).lean()
  res.render('cart',result)
})
  
  module.exports = router