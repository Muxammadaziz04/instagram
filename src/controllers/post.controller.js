const path = require('path')
const { createPostModel, putPostsModel, getPostsModel, deletePostModel, profilePostsModel, singlePostModel } = require('../models/post.model')
const jwt = require('../utils/jwt')

const post = async(req, res, next) => {
    try {
        const { title, date} = req.body
        const {user_id} = jwt.verify(req.headers.token)
        const imgName = Date.now() + req.files?.img.name.replace(/\s/g, '')
        const imgPath = path.join(__dirname, '../', 'uploads', imgName)
        
        const response = await createPostModel(user_id, imgPath, title, date)
        
        if(response?.error || !response.length) return next(response)
        
        req.files.img.mv(imgPath)
        
        res.status(201).send({
            status: 201,
            message: 'successful crested',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const putPost = async(req, res, next) => {
    try {
        const {post_id, title} = req.body
        const {user_id} = jwt.verify(req.headers.token)

        if(req.files?.img){
            const imgName = Date.now() + req.files.img.name.replace(/\s/g, '')
            var imgPath = path.join(__dirname, '../', 'uploads', imgName)
            req.files.img.mv(imgPath)
        }

        const response = await putPostsModel(post_id, user_id, imgPath, title)

        if(response.error || !response[0]) return next(response)

        res.status(201).send({
            status: 201,
            message: 'successful updated',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getPosts = async (req, res, next) => {
    try {
        const response = await getPostsModel()

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const {post_id} = req.params
        const {user_id} = jwt.verify(req.headers.token)

        const response = await deletePostModel(user_id, post_id)

        res.send({
            status: 204,
            message: response[0] ? 'successful deleted' : ''
        })
    } catch (error) {
        console.log(error);
    }
}

const profilePosts = async (req, res) => {
    try {
        const {user_id} = jwt.verify(req.headers.token)

        const response = await profilePostsModel(user_id)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const {post_id} = req.params

        const response = await singlePostModel(post_id)

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    post, putPost, getPosts, deletePost, profilePosts, getSinglePost
}