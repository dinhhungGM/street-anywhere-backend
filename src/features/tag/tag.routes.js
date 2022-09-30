const router = require('express').Router();
const TagController = require('./tag.controller');
const TagValidators = require('./tag.validators');
const { ErrorController } = require('./../error');

router
  .route('/:id')
  .get(TagValidators.validateTagId(), ErrorController.catchValidationError, TagController.getTagById)
  .patch(
    TagValidators.validateTagId(),
    TagValidators.validateTagPayload(),
    ErrorController.catchValidationError,
    TagController.updateTag,
  )
  .delete(TagValidators.validateTagId(), ErrorController.catchValidationError, TagController.deleteTag);

router
  .route('')
  .post(TagValidators.validateTagPayload(), ErrorController.catchValidationError, TagController.createNewTag)
  .get(TagController.getTags);

module.exports = router;
