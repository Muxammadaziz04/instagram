const express = require('express');
const { postComment, deleteComment } = require('../controllers/comment.controller');

const router = express.Router();

router.post('/comment', postComment)
router.delete('/comment/:comment_id', deleteComment)

module.exports = router