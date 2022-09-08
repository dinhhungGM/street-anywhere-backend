const router = require('express').Router();
const { body, param } = require('express-validator');
const TagHandler = require('./../handler/tag');
const ErrorHandler = require('./../handler/error');

router
  .route('/:id')
  .get(
    param('id', 'Tag ID have to be integer number').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    TagHandler.getTagById,
  )
  .patch(
    param('id', 'Tag ID have to be integer number').isNumeric().isInt(),
    body('tagName', 'Tag name does not empty').exists().notEmpty(),
    body('tagName', 'Tag name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    TagHandler.updateTag,
  )
  .delete(
    param('id', 'Tag ID have to be numeric').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    TagHandler.deleteTag,
  );

router
  .route('')
  .post(
    body('tagName', 'Tag name does not empty').exists().notEmpty(),
    body('tagName', 'Tag name have at most 50 characters').isLength({ max: 50 }),
    ErrorHandler.catchValidationError,
    TagHandler.createNewTag,
  )
  .get(TagHandler.getTags);

module.exports = router;
