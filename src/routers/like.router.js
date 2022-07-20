const express = require('express');
const { like } = require('../controllers/like.controller');

const router = express.Router();

router.post('/like', like)

module.exports = router