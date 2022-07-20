const express = require('express')
const { login, register, get, put, getUserWithPosts, deleteUser } = require('../controllers/user.controller.js')

const router = express.Router();

router.get('/users', get)
router.get('/users/:user_id', getUserWithPosts)
router.post('/register', register);
router.post('/login', login)
router.put('/users', put)
router.delete('/users', deleteUser)

module.exports = router