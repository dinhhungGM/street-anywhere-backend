const { check } = require('express-validator');

module.exports = {
  validateSignInPayload: () => [
    check('username')
      .exists()
      .withMessage('Please provide your username')
      .trim()
      .notEmpty()
      .withMessage('The username is not empty'),
    check('password')
      .exists()
      .withMessage('Please provide your password')
      .trim()
      .notEmpty()
      .withMessage('The password is not empty'),
  ],
  validateSignUpPayload: () => [
    check('username')
      .exists()
      .withMessage('Please provide your username')
      .trim()
      .notEmpty()
      .withMessage('The username is not empty')
      .isLength({ max: 50 })
      .withMessage('The username can not be more than 50 characters'),
    check('password')
      .exists()
      .withMessage('Please provide your password')
      .trim()
      .notEmpty()
      .withMessage('The password is not empty')
      .isLength({ max: 50 })
      .withMessage('The password can not be more than 50 characters'),
    check('firstName')
      .exists()
      .withMessage('Please provide your first name')
      .trim()
      .notEmpty()
      .withMessage('The first name is not empty')
      .isLength({ max: 50 })
      .withMessage('The first name can not be more than 50 characters'),
    check('lastName')
      .exists()
      .withMessage('Please provide your last name')
      .trim()
      .notEmpty()
      .withMessage('The last name is not empty')
      .isLength({ max: 50 })
      .withMessage('The last name can not be more than 50 characters'),
  ],
};
