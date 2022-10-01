const router = require('express').Router();
const { ErrorController } = require('../error');
const ReactionController = require('./reaction.controller');
const ReactionValidators = require('./reaction.validators');

router.get(
  '/post/:postId',
  ReactionValidators.validatePostId(),
  ErrorController.catchValidationError,
  ReactionController.getAllReactionsByPostId,
);
router.post(
  '/:postId',
  ReactionValidators.validatePostId(),
  ReactionValidators.validateNewReactPayload(),
  ErrorController.catchValidationError,
  ReactionController.addReaction,
);
module.exports = router;
