const router = require('express').Router();
const { body, param } = require('express-validator');
const CommentHandler = require('./../handler/comment');
const ErrorHandler = require('./../handler/error');

router
  .route('/:id')
  .patch(
    param('id', 'Comment ID should be integer number').isNumeric().isInt(),
    body('content', 'Content does not empty').exists().notEmpty(),
    body('postId', 'Can not update comment of the other post').not().exists(),
    body('userId', 'Can not update comment of the other user').not().exists(),
    ErrorHandler.catchValidationError,
    CommentHandler.updateComment,
  )
  .delete(
    param('id', 'Comment ID should be integer number').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    CommentHandler.deleteComment,
  );
router
  .route('')
  .get(CommentHandler.getComments)
  .post(
    body('content', 'Content does not empty').exists().notEmpty(),
    body('postId', 'Post Id does not empty').exists().notEmpty(),
    body('postId', 'Post Id should be integer number').isNumeric().isInt(),
    body('userId', 'User Id does not empty').exists().notEmpty(),
    body('userId', 'User Id should be integer number').isNumeric().isInt(),
    ErrorHandler.catchValidationError,
    CommentHandler.createComment,
  );
module.exports = router;
