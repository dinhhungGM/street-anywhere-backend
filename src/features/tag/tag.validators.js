const { body, param } = require('express-validator');

module.exports = {
  validateTagId: () => [
    param('id')
      .isInt()
      .withMessage('Please provide a valid tag id. It should be a positive integer')
      .isLength({ min: 1 })
      .withMessage('Please provide a valid tag id. It should be a positive integer'),
  ],
  validateTagPayload: () => [
    body('tagName')
      .exists()
      .withMessage('The tag name is required. Please provide tag name')
      .trim()
      .notEmpty()
      .withMessage('Please provide your tag name, it is not empty')
      .isLength({ max: 20 })
      .withMessage('The tag name can not be more than 20 characters'),
  ],
};
