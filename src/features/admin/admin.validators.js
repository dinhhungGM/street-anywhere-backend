const { param, query } = require('express-validator');

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
};
