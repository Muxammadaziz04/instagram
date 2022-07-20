const { fetchAll, fetch } = require('../utils/postgress.js')

const registerUser = `insert into users (username, password) values ($1, $2) returning *`
const loginUser = `select * from users where username = $1 and password = $2`
const getUsers = `select username from users where deleted = false`

const login = async (username, password) => {
    try {
        return await fetchAll(loginUser, username, password);
    } catch (error) {
        console.error(error);
    }
}

const register = async (username, password) => {
    try {
        return await fetch(registerUser, username, password);
    } catch (error) {
        console.log(error)
    }
}

const get = async () => {
    try {
        return await fetchAll(getUsers)
    } catch (error) {
        console.log(error);
    }
}

const put = async (userId, username, visibility) => {
    try {
        const putUser = `update users set 
            ${username ? 'username = $2' : ''}
            ${(visibility || visibility == false) && !username ? 'visibility = $2' : ''}
            ${(visibility || visibility == false) && username ? ', visibility = $3' : ''}
        where user_id = $1 returning *`

        return await fetch(putUser, userId, username, visibility)
    } catch (error) {
        console.log(error);
    }
}

const search = async (searchValue) => {
    try {
        const searchUser = `select * from users where username ilike '${searchValue}%' and deleted = false`
        return await fetchAll(searchUser)
    } catch (error) {
        console.log(error);
    }
}

const getUserWithPostsModel = async (user_id) => {
    try {
        const getUserWithPostsQuery =  `select t.* from 
        (select u.*, json_agg(p.*) posts from users u left join posts p on u.user_id = p.user_id group by u.user_id) as t
        where t.user_id = $1;`

        return await fetchAll(getUserWithPostsQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const deleteUserModel = async (user_id, password) => {
    try { console.log(user_id);
        const randomNum = Math.floor(Math.random() * 999999) + 100000
        const deleteUserPosts = 'delete from posts where user_id = $1;'
        const deleteUserComments = 'delete from comments where to_whose_user_posts = $1;'
        const deleteUserQuery = `update users set deleted = true, username = 'deletedaccount${randomNum}' where user_id = $1 and password = $2 returning *`

        await fetchAll(deleteUserComments, user_id)
        await fetchAll(deleteUserPosts, user_id)
        return await fetchAll(deleteUserQuery, user_id, password)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login, register, get, put, search, getUserWithPostsModel, deleteUserModel
}