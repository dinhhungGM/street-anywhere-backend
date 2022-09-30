const router = require('express').Router();
const AuthController = require('./auth.controller');
const { ErrorController } = require('./../error');
const AuthValidators = require('./auth.validators');

router.post(
  '/sign-in',
  AuthValidators.validateSignInPayload(),
  ErrorController.catchValidationError,
  AuthController.handleSignIn,
);
router.post(
  '/sign-up',
  AuthValidators.validateSignUpPayload(),
  ErrorController.catchValidationError,
  AuthController.handleSignUp,
);
module.exports = router;
