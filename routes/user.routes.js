const express = require('express');
const userControler  = require('../controllers/user.contollers');
const authMiddleware = require('../middleware/auth-middleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validateUserData } = require('../utils/validation.utils');

const router = express.Router();


router.post('/signup',[validateMiddleware(validateUserData.body)], userControler.userSignup);
router.post('/login', userControler.userLogin);
router.post('/forgot-password', userControler.forgotPassword);
router.post('/reset-password', userControler.resetPassword);

router.get('/', [authMiddleware, validateMiddleware(validateUserData.query, 'query')], userControler.getAllUsers)

module.exports = router;
