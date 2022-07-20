const { fetch } = require('../utils/postgress')

const likeModel = async (post_id, type) => {
    try {
        const likeQuery = `
        ${type == 'add' ? 'update posts set likes = likes + 1 where post_id = $1 returning *' : ''}
        ${type == 'delete' ? 'update posts set likes = likes - 1 where post_id = $1 and likes >= 0 returning *' : ''}`

        return await fetch(likeQuery, post_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    likeModel
}