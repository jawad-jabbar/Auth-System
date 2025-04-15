const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createPost, getAllPosts, getPostById } = require('../controllers/post.controller');

router.post('/', authMiddleware, upload.array('images', 5), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);

module.exports = router;
