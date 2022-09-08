const router = require('express').Router();
const { body, param } = require('express-validator');
const CategoryHandler = require('./../handler/category');
const ErrorHandler = require('./../handler/error');

router
  .route('/:id')
  .get(
    param('id', 'Category ID have to be integer number').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    CategoryHandler.getCategoryById,
  )
  .patch(
    param('id', 'Category ID have to be integer number').isNumeric().isInt(),
    body('categoryName', 'Category name does not empty').exists().notEmpty(),
    body('categoryName', 'Category name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    CategoryHandler.updateCategory,
  )
  .delete(
    param('id', 'Category ID have to be numeric').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    CategoryHandler.deleteCategory,
  );

router
  .route('')
  .post(
    body('categoryName', 'Category name does not empty').exists().notEmpty(),
    body('categoryName', 'Category name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    CategoryHandler.createNewCategory,
  )
  .get(CategoryHandler.getCategories);

module.exports = router;
