const jwt = require('../utils/jwt.js')
const model = require('../models/user.model.js')

const login = async (req, res, next) => {
    try {
        let {username, password} = req.body
        let response = await model.login(username, password)
       
        if( !response.length || response.error ) {
            return next(response)
        }
  
        res.status(200).send({
            message: "successful logined",
            status: 200,
            token: jwt.sign({ user_id: response[0].user_id })
        })
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res, next) => {
    try {
        let {username, password} = req.body
        let response = await model.register(username, password)
        
        if( response.error || !response.length ) return next(response)

        res.status(201).send({
            message: "successful register",
            status: 201,
            token: jwt.sign({ user_id: response[0].user_id })
        })
    } catch (error) {
        console.log(error);
    }
}

const get = async (req, res, next) => {
   try {
     let { search } = req.query
     
     const response = search ? await model.search(search) : await model.get()
     
     if( response.error ) return next(response)
 
     res.status(200).send({
         status: 200,
         data: response
     })
   } catch (error) {
        console.log(error);
   }
}

const put = async (req, res, next) => {
    try {
        const { username, visibility } = req.body
        const {user_id} = jwt.verify(req.headers.token)

        const response = await model.put(user_id, username, visibility)

        if( response.error ) return next(response)

        res.status(201).send({
            status:201,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserWithPosts = async(req, res, next) => {
    try {
        const {user_id} = req.params

        const response = await model.getUserWithPostsModel(user_id)

        if(response.error) return next(response)
        if(response[0].visibility == false) {
            res.status(200).send({
                status:200,
                message: 'account zakritiy'
            })
        }

        res.status(200).send({
            status:200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const {user_id} = jwt.verify(req.headers.token)
        const {password} = req.body

        const response = await model.deleteUserModel(user_id, password)

        if(response.error) return next(response)

        res.send({
            status: 204,
            message:'successful deleted',
            data : response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    login, register, get, put, getUserWithPosts, deleteUser
}