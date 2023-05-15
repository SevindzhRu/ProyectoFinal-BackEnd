const {Schema, model} = require ('mongoose')
const mongoosePaginate = require ('mongoose-paginate-v2')
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

productSchema.plugin(mongoosePaginate)

const productModel = model(collection, productSchema)

module.exports = {productModel}