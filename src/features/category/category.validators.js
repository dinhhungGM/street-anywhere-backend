const { check } = require('express-validator');

module.exports = {
  validateCategoryId: () => [
    check('id').trim().isInt().withMessage('Please provide a valid category id. It should be a positive integer'),
  ],
  validateCategoryPayload: () => [
    check('categoryName')
      .exists()
      .withMessage('Please provide your category name')
      .trim()
      .notEmpty()
      .withMessage('Please provide your category name to update')
      .isLength({ max: 50 })
      .withMessage('The category name can not be more than 50 characters'),
  ],
};
