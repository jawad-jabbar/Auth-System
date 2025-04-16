const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const commentControler = require('../controllers/comment.controller');

router.post('/', [authMiddleware, upload.single('image')], commentControler.createComment);
router.get('/:postId', commentControler.getPostComments);

module.exports = router;