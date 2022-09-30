const router = require('express').Router();
const { ErrorController } = require('../error');
const UserValidators = require('./user.validators');
const UserController = require('./user.controller');

router.get('/avatar', UserValidators.validateUserId(), ErrorController.catchValidationError, UserController.getAvatar);

module.exports = router;
