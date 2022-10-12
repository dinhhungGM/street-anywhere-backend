const router = require('express').Router();
const { ErrorController } = require('./../error');
const CommentController = require('./comment.controller');
const CommentValidators = require('./comment.validators');

router
  .route('/post/:postId')
  .get(
    CommentValidators.validatePostId(),
    CommentValidators.validatePageNumber(),
    ErrorController.catchValidationError,
    CommentController.getCommentsByPostId,
  )
  .post(
    CommentValidators.validateNewCommentPayload(),
    ErrorController.catchValidationError,
    CommentController.createComment,
  );
router
  .route('/:commentId')
  .patch(
    CommentValidators.validateCommentId(),
    CommentValidators.validateContent(),
    ErrorController.catchValidationError,
    CommentController.updateCommentByCommentId,
  )
  .delete(CommentValidators.validateCommentId(), ErrorController.catchValidationError, CommentController.deleteComment);
module.exports = router;
