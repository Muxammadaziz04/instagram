const jwt = require('../utils/jwt.js');
const { fetch, fetchAll } = require('../utils/postgress.js')

const createPostModel = async (user_id, photo, title, date) => {
    try {
        const createPostQuery = `insert into posts (user_id, photo, title ${date ? ', date': ''}) values ($1, $2, $3 ${date ? ', $4' : ''}) returning *`
        return await fetch(createPostQuery, user_id, photo, title, date);
    } catch (error) {
        console.error(error);
    }
}

const putPostsModel = async (post_id, user_id, photo, title) => {
    try {
        const putPostQuery = `update posts set
         ${photo ? 'photo = $3' : ''}
         ${title && !photo ? 'title = $3' : ''}
         ${title && photo ? ', title = $4' : ''}
         where post_id = $1 and user_id = $2 returning *`

        return await fetch(putPostQuery, post_id, user_id, photo, title)
    } catch (error) {
        console.log(error);
    }
}

const getPostsModel = async() => {
    try {
        const getPostsQuery = ` select * from posts`
        return await fetchAll(getPostsQuery)
    } catch (error) {
        console.log(error);
    }
}

const deletePostModel = async (user_id, post_id) => {
    try {
        const deletePostQuery = `delete from posts where user_id = $1 and post_id = $2 returning *`
        return await fetch(deletePostQuery, user_id, post_id)
    } catch (error) {
        console.log(error);
    }
}

const profilePostsModel = async (user_id) => {
    try {
        const profilePostsQuery = `select * from posts where user_id = $1`
        return await fetchAll(profilePostsQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const singlePostModel = async (post_id) => {
    try {
        const singlePostQuery = `
        select r.* from (
            select p.*, json_agg(c) as comments from posts as p left join 
                (select * from comments order by created_time desc limit 1) as c 
                on p.post_id = c.post_id group by p.post_id
            ) as r
        where post_id = $1;`

        return await fetchAll(singlePostQuery, post_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createPostModel, putPostsModel, getPostsModel, deletePostModel, profilePostsModel, singlePostModel
}