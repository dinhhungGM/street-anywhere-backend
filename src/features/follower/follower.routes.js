const router = require('express').Router();
const FollowerController = require('./follower.controller');
const FollowerValidators = require('./follower.validators');
const { ErrorController } = require('./../error');

router.get(
  '/user/:userId',
  FollowerValidators.validateUserId(),
  ErrorController.catchValidationError,
  FollowerController.getFollowerByUserId,
);
router
  .route('')
  .post(
    FollowerValidators.validateUserIdAndFollowerId(),
    ErrorController.catchValidationError,
    FollowerController.addFollower,
  )
  .delete(
    FollowerValidators.validateUserIdAndFollowerId(),
    ErrorController.catchValidationError,
    FollowerController.deleteFollower,
  );
module.exports = router;
