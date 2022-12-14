const router = require('express').Router();
const { ErrorController } = require('../error');
const UserValidators = require('./user.validators');
const UserController = require('./user.controller');
const uploadFile = require('./../../utils/multer');

router.get('/followers/:userId', UserValidators.validateUserId(), UserController.getFollowers);
router.get(
  '/reacted/:userId',
  UserValidators.validateUserId(),
  UserController.getReactedPostOfUser,
);
router.get(
  '/bookmarked/:userId',
  UserValidators.validateUserId(),
  UserController.getBookmarkedPostOfUser,
);
router.get('/following/:userId', UserValidators.validateUserId(), UserController.getFollowingUsers);

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
  .get(
    UserValidators.validateUserId(),
    ErrorController.catchValidationError,
    UserController.getProfileOfUser,
  );
router.route('*', ErrorController.handleNotFound);
module.exports = router;
