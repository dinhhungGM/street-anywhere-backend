const router = require('express').Router();
const { body } = require('express-validator');
const CategoryHandler = require('./../handler/category');
const ErrorHandler = require('./../handler/error');

router
  .route('')
  .post(
    body('categoryName', 'Category name does not empty').not().isEmpty(),
    body('categoryName', 'Category name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    CategoryHandler.createNewCategory,
  );

module.exports = router;
