const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createPost, getAllPosts } = require('../controllers/post.controller');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validatePostData } = require('../utils/validation.utils');

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  validateMiddleware(validatePostData),
  createPost
);
router.get("/posts", authMiddleware, getAllPosts);

module.exports = router;