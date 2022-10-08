const router = require('express').Router();
const { ErrorController } = require('../error');
const ReactionController = require('./reaction.controller');
const ReactionValidators = require('./reaction.validators');

router
  .route('/post/:postId')
  .get(
    ReactionValidators.validatePostId(),
    ErrorController.catchValidationError,
    ReactionController.getAllReactionsByPostId,
  )
  .post(
    ReactionValidators.validatePostId(),
    ReactionValidators.validateNewReactPayload(),
    ErrorController.catchValidationError,
    ReactionController.addReaction,
  );
router
  .route('/:postReactionId')
  .patch(
    ReactionValidators.validatePostReactionId(),
    ReactionValidators.validateUpdateReactionId(),
    ErrorController.catchValidationError,
    ReactionController.updateReaction,
  )
  .delete(
    ReactionValidators.validatePostReactionId(),
    ErrorController.catchValidationError,
    ReactionController.deletePostReaction,
  );
router.route('').get(ReactionController.getReactions);
module.exports = router;
