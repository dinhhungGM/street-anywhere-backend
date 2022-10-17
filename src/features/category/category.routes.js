const router = require('express').Router();
const CategoryController = require('./category.controller');
const CategoryValidators = require('./category.validators');
const { ErrorController } = require('./../error');

router
  .route('/:id')
  .get(
    CategoryValidators.validateCategoryId(),
    ErrorController.catchValidationError,
    CategoryController.getCategoryById,
  )
  .patch(
    CategoryValidators.validateCategoryId(),
    CategoryValidators.validateCategoryPayload(),
    ErrorController.catchValidationError,
    CategoryController.updateCategory,
  )
  .delete(
    CategoryValidators.validateCategoryId(),
    ErrorController.catchValidationError,
    CategoryController.deleteCategory,
  );

router
  .route('')
  .post(
    CategoryValidators.validateCategoryPayload(),
    ErrorController.catchValidationError,
    CategoryController.createNewCategory,
  )
  .get(CategoryController.getCategories);

module.exports = router;
