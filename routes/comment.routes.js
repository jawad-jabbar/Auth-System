const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createComment, getPostComments } = require('../controllers/comment.controller');

router.post('/', authMiddleware, upload.single('image'), createComment);
router.get('/:postId', getPostComments);

module.exports = router;