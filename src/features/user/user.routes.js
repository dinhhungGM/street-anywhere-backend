const router = require('express').Router();
const { ErrorController } = require('../error');
const UserValidators = require('./user.validators');
const UserController = require('./user.controller');
const uploadFile = require('./../../utils/multer');

router.get(
  '/avatar/:userId',
  UserValidators.validateUserId(),
  ErrorController.catchValidationError,
  UserController.getAvatar,
);

router.get(
  '/coverImage/:userId',
  UserValidators.validateUserId(),
  ErrorController.catchValidationError,
  UserController.getCoverImage,
);

router
  .route('/:userId')
  .patch(
    UserValidators.validateUserId(),
    ErrorController.catchValidationError,
    uploadFile.single('file'),
    UserController.updateUser,
  )
  .get(UserValidators.validateUserId(), ErrorController.catchValidationError, UserController.getProfileOfUser);
router.route('*', ErrorController.handleNotFound);
module.exports = router;
