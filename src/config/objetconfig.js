const {connect} = require ('mongoose')

let url = "mongodb+srv://sevi:sevi123@cluster0.5n1uhbl.mongodb.net/ecommerce?retryWrites=true&w=majority"

module.exports = {
    connectDB: ()=>{
        connect(url)
        console.log('DB conectada online')
    }
}