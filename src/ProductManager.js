const fs = require('fs')

class ProductManager {
        constructor(){
        this.product = []
        this.path = "./src/productos.json"
    }

    readFile = async () =>{
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }catch (error){
            return []
        }
    }

    getProducts = async() => {
        try{
            return await this.readFile()
        }
        catch (error){
            return new Error(error)
        }
    }

    getProductById = async (id) => {
        try {
            this.product = await this.readFile()
            console.table(this.product)
            return this.product.find(prod => prod.id === id)
        }catch (error){
            return new Error(error) 
        }
    }

     addProduct  = async (newProduct) => {      
        try{
            this.product = await this.getProducts()
            if (!newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.stock ||
                !newProduct.code) return 'Error: Todos los campos son obligatorios'
            let codProd = this.product.find(prod => prod.code === newProduct.code)
            if (codProd) return 'Codigo duplicado'
            if (this.product.length === 0 ) {
                newProduct.id = 1
                this.product.push(newProduct) 
            } else {
                this.product = [...this.product, {id: this.product[this.product.length - 1].id + 1, ...newProduct , status: true} ]
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.product,'utf-8','\t'))
            return 'Producto cargado'
        }catch (error){
            return new Error(error)
        }
	}	


    updateProduct = async (id, updProd) => {
        try{
            this.product = await this.readFile()
            let producto = this.product.find(prod => prod.id === id)
            if (!producto) return 'Not found'
            producto.title = updProd.title
            producto.description = updProd.description
            producto.price = updProd.price
            producto.thumbnails = updProd.thumbnails
            producto.stock = updProd.stock
            producto.code= updProd.code
            producto.status= updProd.status
            await fs.promises.writeFile(this.path, JSON.stringify(this.product,'utf-8','\t'))
            return 'Producto Actualizado'
            }
        catch (error){
            return new Error(error)
        }
    }

    deleteProduct  = async (idDelete) => {
        try{
            this.product = await this.readFile()
            const remove = this.product.filter(prod => prod.id !== idDelete)
            if (this.product.length === remove.length){ //comparo el array original con el filtrado, si son iguales quiere decir que no existe el ID
                return 'Id no encontrado'
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(remove,'utf-8','\t'))
                return 'Producto eliminado'
            }
        }
        catch (error){
            return new Error(error)
        }
    }
}

module.exports = { ProductManager };