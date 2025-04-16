const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const postControler = require('../controllers/post.controller');

router.post('/', [authMiddleware, upload.array('images', 5)], postControler.createPost);
router.get('/', postControler.getAllPosts);
router.get('/:id', postControler.getPostById);

module.exports = router;
