const { param, body } = require('express-validator');

module.exports = {
  validateUpdateUserPayload: () => [
    body('firstName').optional().trim().notEmpty().withMessage('Please provide your first name to continue'),
    body('lastName').optional().trim().notEmpty().withMessage('Please provide your last name to continue'),
    body('bio').optional().trim().notEmpty().withMessage('Please provide bio link to continue'),
    body('phone').optional().trim().notEmpty().withMessage('Please provide phone link to continue'),
    body('email').optional().trim().notEmpty().withMessage('Please provide email link to continue'),
    body('password').optional().trim().notEmpty().withMessage('Please provide password link to continue'),
  ],
  validateUserId: () => [
    param('userId')
      .trim()
      .isInt()
      .withMessage('Invalid User ID. It should be a positive integer')
      .isLength({ min: 0 })
      .withMessage('Invalid User ID. It should be a positive integer')
      .toInt(),
  ],
  validateUpdateUserPayload: () => [],
};
