const {Schema, model} = require ('mongoose')
const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    thumbnails: Array,
    stock: Number,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const productModel = model(collection, productSchema)

module.exports = {productModel}