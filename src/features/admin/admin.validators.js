const { param, query, body } = require('express-validator');

module.exports = {
  validateUserId: () => [
    param('userId')
      .exists()
      .withMessage('Please provide the User ID to continue')
      .trim()
      .isInt()
      .withMessage('Invalid User Id. It should be a positive integer')
      .isLength({ min: 0 })
      .withMessage('Invalid User Id. It should be a positive integer')
      .toInt(),
  ],
  validateAdminUserId: () => [
    query('adminUserId')
      .exists()
      .withMessage('Please provide the Admin User ID to continue')
      .trim()
      .isInt()
      .withMessage('Invalid User Id. It should be a positive integer')
      .isLength({ min: 0 })
      .withMessage('Invalid User Id. It should be a positive integer')
      .toInt(),
  ],
  validateNewUserPayload: () => [
    body('username')
      .exists()
      .withMessage('Please provide the username to continue')
      .trim()
      .notEmpty()
      .withMessage('The username can not be empty')
      .isLength({ min: 2, max: 50 })
      .withMessage('The username can not be more than 50 and less than 2 characters'),
    body('password')
      .exists()
      .withMessage('Please provide the password to continue')
      .trim()
      .notEmpty()
      .withMessage('The password can not be empty')
      .isLength({ min: 6, max: 50 })
      .withMessage('The password can not be more than 50 and less than 6 characters'),
    body('firstName')
      .exists()
      .withMessage('Please provide the firstName to continue')
      .trim()
      .notEmpty()
      .withMessage('The firstName can not be empty')
      .isLength({ max: 50 })
      .withMessage('The firstName can not be more than 50 characters'),
    body('lastName')
      .exists()
      .withMessage('Please provide the lastName to continue')
      .trim()
      .notEmpty()
      .withMessage('The lastName can not be empty')
      .isLength({ max: 50 })
      .withMessage('The lastName can not be more than 50 characters'),
    body('roleId')
      .exists()
      .withMessage('Please provide roleId to continue')
      .trim()
      .isInt()
      .withMessage('The roleId should be a positive integer')
      .isLength({ min: 1 })
      .withMessage('Invalid roleId. It should be a positive integer')
      .toInt(),
  ],
  validateTagName: () => [
    body('tagName')
      .exists()
      .withMessage('Please provide the tag name to continue')
      .trim()
      .notEmpty()
      .withMessage('The tag name does not empty')
      .isLength({ max: 50 })
      .withMessage('The tag name can not be more than 50 characters'),
  ],
  validateTagId: () => [
    param('tagId')
      .exists()
      .withMessage('Please provide the tag id to continue')
      .trim()
      .notEmpty()
      .withMessage('The tag id does not empty')
      .isInt()
      .withMessage('The tag id is invalid. It should be a integer')
      .isLength({ min: 0 })
      .withMessage('The tag id can not be a negative integer'),
  ],
};
