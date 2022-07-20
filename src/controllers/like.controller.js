const { likeModel } = require("../models/like.model")

const like = async (req, res, next) => {
    try {
        const {post_id, type} = req.body

        const response = await likeModel(post_id, type)

        if(response.error || !response.length) return next(response)

        res.status(201).send({
            status: 201,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    like
}