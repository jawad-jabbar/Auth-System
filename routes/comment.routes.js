const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createComment } = require('../controllers/comment.controller');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validateCommentData } = require('../utils/validation.utils');
const commentController = require('../controllers/comment.controller');

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  validateMiddleware(validateCommentData),
  createComment
);

router.get('/comments',authMiddleware,commentController.getAllComments);

module.exports = router;