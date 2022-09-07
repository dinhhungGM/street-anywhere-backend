const router = require('express').Router();
const AuthHandler = require('./../handler/auth');
router.post('/sign-in', AuthHandler.handleSignIn);
router.post('/sign-up', AuthHandler.handleSignUp);
module.exports = router;