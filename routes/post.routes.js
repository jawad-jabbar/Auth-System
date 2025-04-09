// const express = require('express');
// const { createPost, getAllPosts } = require('../controllers/post.controller');
// const authMiddleware = require('../middleware/auth-middleware');
// const validateMiddleware = require('../middleware/validateMiddleware');
// const { validatePostData } = require('../utils/validation.utils');

// const router = express.Router();

// // router.post('/', authMiddleware, validateMiddleware(validatePostData), createPost);
// router.post(
//   '/',
//   authMiddleware,
//   upload.single('image'),
//   validateMiddleware(validatePostData),
//   createPost
// );

// module.exports = router;
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
router.get('/', getAllPosts);

module.exports = router;

