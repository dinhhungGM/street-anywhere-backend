const router = require('express').Router();
const { param } = require('express-validator');
const MediaHandler = require('./../handler/media');
const ErrorHandler = require('./../handler/error');

router.get(
  '/:id',
  param('id', 'Media Source Id does not empty').exists().isNumeric().isInt(),
  ErrorHandler.catchValidationError,
  MediaHandler.getMedia,
);
module.exports = router;
