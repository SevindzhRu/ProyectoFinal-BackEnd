const {Schema, model, mongoose} = require ('mongoose')
const collection = 'carts'

const cartSchema = new Schema({
	status: String,
    products: [{
		productID: { 	
			type: Schema.Types.ObjectId,
			ref: 'products'
		},
quantity: Number
       }]
})


const cartModel = model(collection, cartSchema)

module.exports = {cartModel}