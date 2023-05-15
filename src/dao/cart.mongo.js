const { cartModel } = require("./models/carts.model")

class CartManagerMongo {
    
    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getCartstById(cid){
        try {            
            return await cartModel.findOne({_id: cid})
        } catch (error) {
            return new Error(error)
        }

    }

    async addCart(){
        try {
            return await cartModel.create({status: 'ok', products: []})
        } catch (error) {
            return new Error(error)
        }
    }

    async updateCart(cid, pid){
        try {
            const cart = await cartModel.findOne({_id: cid, "products.productID": pid})
            //console.log(`carrito: ${cart}`)
            if (cart !== null) {
                return await cartModel.updateOne({_id: cid, "products.productID": pid}, {$inc: { "products.$.quantity": 1}})          
            }else{
                return await cartModel.updateOne({_id: cid}, {$push: { products: {productID: pid, quantity: 1}}})
            }
        } catch (error) {
            return new Error(error)
        }
    }

    //updateCartProduct
    async updateCartProduct(cid, pid, quantity){
        try {
            const cart = await cartModel.findOne({_id: cid, "products.productID": pid})
            //console.log(`carrito: ${cart} Cantidad nueva: ${quantity}`)
            if (cart !== null) {
                //return await cartModel.findOneAndUpdate({_id: cid, "products.productID": pid}, {$push: { "products.$.quantity": quantity}},{upsert: true})
                return await cartModel.findAndUpdate({_id: cid, "products.productID": pid}, {$set: { "products.$.quantity": quantity}})
            }
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteCart(cid){
        try {
            return await cartModel.deleteOne({_id: cid})
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteCartByID(cid, pid){
        try {
            return await cartModel.findOneAndUpdate({_id: cid}, {$pull: {products: {productID: pid}}},{new: true} )
        } catch (error) {
            return new Error(error)
        }
    }

}



module.exports = new CartManagerMongo