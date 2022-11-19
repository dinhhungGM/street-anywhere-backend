const router = require('express').Router();
const { ErrorController } = require('../error');
const UserValidators = require('./user.validators');
const UserController = require('./user.controller');
const uploadFile = require('./../../utils/multer');

router.get('/avatar', UserValidators.validateUserId(), ErrorController.catchValidationError, UserController.getAvatar);
router
  .route('/:userId')
  .patch(uploadFile.single('avatar'), UserController.updateUser)
  .get(UserValidators.validateUserId(), ErrorController.catchValidationError, UserController.getProfileOfUser);

module.exports = router;
