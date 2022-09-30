const router = require('express').Router();
const { ErrorController } = require('./../error');
const CommentController = require('./comment.controller');
const CommentValidators = require('./comment.validators');

router
  .route('/post/:postId')
  .get(CommentValidators.validatePostId(), ErrorController.catchValidationError, CommentController.getCommentsByPostId)
  .post(
    CommentValidators.validateNewCommentPayload(),
    ErrorController.catchValidationError,
    CommentController.createComment,
  );

router.delete(
  '/:commentId',
  CommentValidators.validateCommentId(),
  ErrorController.catchValidationError,
  CommentController.deleteComment,
);
module.exports = router;
