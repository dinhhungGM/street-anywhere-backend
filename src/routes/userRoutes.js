const router = require('express').Router();
const { param } = require('express-validator');
const UserHandler = require('./../handler/user');
const ErrorHandler = require('./../handler/error');

router.get(
  '/avatar',
  param('id', 'User ID is required. It should be integer value').exists().isNumeric().isInt(),
  ErrorHandler.catchValidationError,
  UserHandler.getAvatar,
);
module.exports = router;
