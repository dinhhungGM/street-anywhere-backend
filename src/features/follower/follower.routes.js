const router = require('express').Router();
const FollowerController = require('./follower.controller');
const FollowerValidators = require('./follower.validators');
const { ErrorController } = require('./../error');

router.get(
  '/user/:followerId',
  FollowerValidators.validateFollowerId(),
  ErrorController.catchValidationError,
  FollowerController.getFollowerByFollowerId,
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
