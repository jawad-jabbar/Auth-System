const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const commentControler = require('../controllers/comment.controller');
const { diskUpload } = require('../middleware/upload.middleware');


router.post('/', [authMiddleware, diskUpload.single('image')], commentControler.createComment);
router.get('/:postId', commentControler.getPostComments);

module.exports = router;