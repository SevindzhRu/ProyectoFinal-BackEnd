const { Router } = require ('express')
const { userModel } = require('../dao/models/user.model')
const router = Router()

//------------------------------------------------
//GET
router.get('/', async(req, res) => {
    try{
        let users = await userModel.find()
        console.log(users)
        res.send({
            status: 'success',
            payload: users
        })
    }catch(error){
        console.log(error)
    }
})

//------------------------------------------------
// POST
router.post('/', async (req, res)=>{
    try {
        let user = req.body

        if(!user.first_name || !user.last_name){ 
            return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
        }
        const newUser = {
            first_name: user.first_name, 
            last_name: user.last_name,
            email: user.email
        } 
        let result =  await userModel.create(newUser)   
        res.status(200).send({result})
    } catch (error) {
        console.log(error)
    }
    
})

//------------------------------------------------
// PUT
router.put('/:uid', async (req, res) => {
    const { uid } = req.params
    const user = req.body

    if(!user.first_name || !user.last_name){ 
        return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    }
    let  userToReplace = {
        first_name: user.first_name, 
        last_name: user.last_name,
        email: user.email
    }
    let result = await userModel.updateOne({_id: uid}, userToReplace)
    res.send({
        status: 'success',
        payload: result
    })
})


//------------------------------------------------
//DELETE
router.delete('/:uid', async (req, res) => {
    try {
        let {uid} = req.params
        let result = await userModel.deleteOne({_id: uid})
        res.send({status: 'success', payload: result})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router