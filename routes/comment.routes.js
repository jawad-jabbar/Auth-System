// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload.middleware');
// const authMiddleware = require('../middleware/auth-middleware');
// const { createComment, getAllComments } = require('../controllers/comment.controller');
// const validateMiddleware = require('../middleware/validateMiddleware');
// const { validateCommentData } = require('../utils/validation.utils');

// router.post(
//   '/',
//   authMiddleware,
//   upload.single('image'),  // Make sure this matches your form field name
//   validateMiddleware(validateCommentData),
//   createComment
// );
// router.get('/', getAllComments);

// module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { createComment, getPostComments } = require('../controllers/comment.controller');

router.post('/', authMiddleware, upload.single('image'), createComment);
router.get('/:postId', getPostComments);

module.exports = router;