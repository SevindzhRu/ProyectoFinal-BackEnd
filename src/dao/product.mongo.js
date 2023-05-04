const { productModel } = require("./models/products.model")

class ProductManagerMongo {
    
    async getProducts(){
        try{
            return await productModel.find({}).lean()
        }catch(err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try {            
            return await productModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }

    }

    async addProduct(newProduct){
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateProduct(pid, newProduct){
        try {
            return await productModel.updateOne({_id: pid},newProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProduct(pid){
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = new ProductManagerMongo