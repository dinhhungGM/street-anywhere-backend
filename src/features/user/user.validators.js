const { param, body } = require('express-validator');

module.exports = {
  validateUserId: () => [
    param('id').isNumeric().withMessage('Please provide a valid user id. It should be a positive value'),
  ],
  validateUpdateUserPayload: () => [
    body('firstName').optional().trim().notEmpty().withMessage('Please provide your first name to continue'),
    body('lastName').optional().trim().notEmpty().withMessage('Please provide your last name to continue'),
    body('bio').optional().trim().notEmpty().withMessage('Please provide bio link to continue'),
  ],
};
