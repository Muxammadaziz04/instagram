const express = require('express');
const { post, getPosts, putPost, deletePost, profilePosts, getSinglePost } = require('../controllers/post.controller.js');

const router = express.Router();

router.get('/posts', getPosts)
router.get('/posts/:post_id', getSinglePost)
router.post('/posts', post)
router.put('/posts', putPost)
router.delete('/posts/:post_id', deletePost)
router.get('/profile', profilePosts)

module.exports = router