const router = require('express').Router();
const { body, param } = require('express-validator');
const CategoryHandler = require('./../handler/category');
const ErrorHandler = require('./../handler/error');

router
  .route('/:id')
  .get(
    param('id', 'Category ID have to be numeric').isNumeric(),
    param('id', 'Category ID is not float value').isInt(),
    ErrorHandler.catchValidationError,
    CategoryHandler.getCategoryById,
  )
  .delete(
    param('id', 'Category ID have to be numeric').isNumeric(),
    param('id', 'Category ID is not float value').isInt(),
    ErrorHandler.catchValidationError,
    CategoryHandler.deleteCategory
  );

router
  .route('')
  .post(
    body('categoryName', 'Category name does not empty').exists().notEmpty(),
    body('categoryName', 'Category name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    CategoryHandler.createNewCategory,
  );

module.exports = router;
