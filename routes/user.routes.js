const express = require('express');
const { userSignup, userLogin, forgotPassword, resetPassword, getAllUsers} = require('../controllers/user.contollers');
const authMiddleware = require('../middleware/auth-middleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { validateUserData } = require('../utils/validation.utils');

const router = express.Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/users', 
    authMiddleware(['admin']), 
    validateMiddleware(validateUserData.query, 'query'),
    getAllUsers
);
  

module.exports = router;
