const { fetch } = require('../utils/postgress')

const postCommentModel = async (user_id, post_id, title) => {
    try {
        const postCommentQuery = `insert into comments (user_id, post_id, title, to_whose_user_post) values ($1, $2, $3, (select user_id from posts where post_id = $2)) returning *`
        return await fetch(postCommentQuery, user_id, post_id, title)
    } catch (error) {
        console.log(error);
    }
}

const deleteCommentModel = async (comment_id, user_id) => {
    try {
        const deleteCommetnQuery = 'delete from comments where comment_id = $1 and (user_id = $2 or to_whose_user_post = $2)'

        return await fetch(deleteCommetnQuery, comment_id, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postCommentModel, deleteCommentModel
}