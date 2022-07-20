const { postCommentModel, deleteCommentModel } = require("../models/comment.model");
const jwt = require("../utils/jwt");

const postComment = async (req, res, next) => {
    try {
        const {user_id} = jwt.verify(req.headers.token)
        const {post_id, title} = req.body

        const response = await postCommentModel(user_id, post_id, title)

        if(response.error || !response.length) return next(response)

        res.status(201).send({
            status: 201,
            message: 'successful created comment',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteComment = async(req, res) => {
    try {
        const {user_id} = jwt.verify(req.headers.token)
        const {comment_id} = req.params

        const response = await deleteCommentModel(comment_id, user_id)

        if(response.error || !response.length) return next(response)

        res.send({
            status: 204,
            message: 'successful deleted'
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postComment, deleteComment
}