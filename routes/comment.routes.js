// const express = require('express');
// const { createComment, getAllComments } = require('../controllers/comment.controller');
// const authMiddleware = require('../middleware/auth-middleware');
// const validateMiddleware = require('../middleware/validateMiddleware');
// const { validateCommentData } = require('../utils/validation.utils');

// const router = express.Router();

// router.post('/', authMiddleware, validateMiddleware(validateCommentData), createComment);

// module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createComment, getAllComments } = require('../controllers/comment.controller');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validateCommentData } = require('../utils/validation.utils');

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  validateMiddleware(validateCommentData),
  createComment
);
router.get('/', getAllComments);

module.exports = router;
