const router = require('express').Router();
const ErrorHandler = require('./../handler/error');
const { body } = require('express-validator');

const AuthHandler = require('./../handler/auth');
router.post(
  '/sign-in',
  body('username', 'Username does not empty').exists().trim().notEmpty(),
  body('password', 'Password does not empty').exists().trim().notEmpty(),
  ErrorHandler.catchValidationError,
  AuthHandler.handleSignIn,
);
router.post(
  '/sign-up',
  body('username', 'Username does not empty').exists().trim().notEmpty(),
  body('password', 'Password does not empty').exists().trim().notEmpty(),
  body('password', 'Password have to contain at least 6 character and at most 50 characters')
    .trim()
    .isLength({ min: 6, max: 50 }),
  body('firstName', 'First name does not empty').exists().trim().notEmpty(),
  body('firstName', 'Your first name have to contain at most 50 characters').trim().isLength({ max: 50 }),
  body('lastName', 'Last name does not empty').exists().trim().notEmpty(),
  body('firstName', 'Your last name have to contain at most 50 characters').trim().isLength({ max: 50 }),
  ErrorHandler.catchValidationError,
  AuthHandler.handleSignUp,
);
module.exports = router;
