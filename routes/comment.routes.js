const express = require('express');
const { createComment, getAllComments } = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth-middleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validateCommentData } = require('../utils/validation.utils');

const router = express.Router();

router.post('/', authMiddleware, validateMiddleware(validateCommentData), createComment);
router.get('/', getAllComments);

module.exports = router;