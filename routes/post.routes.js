const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const postControler = require('../controllers/post.controller');
const { memoryUpload } = require('../middleware/upload.middleware');


router.post('/', [authMiddleware, memoryUpload.array('images', 5)], postControler.createPost);
router.get('/', postControler.getAllPosts);
router.get('/:id', postControler.getPostById);

module.exports = router;
