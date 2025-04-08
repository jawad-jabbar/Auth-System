const express = require('express');
const { createPost, getAllPosts } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth-middleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validatePostData } = require('../utils/validation.utils');

const router = express.Router();

router.post('/', authMiddleware, validateMiddleware(validatePostData), createPost);
router.get('/', getAllPosts);

module.exports = router;
