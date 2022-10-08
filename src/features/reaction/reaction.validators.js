const { body, param } = require('express-validator');

module.exports = {
  validateNewReactPayload: () => [
    body('reactionId')
      .exists()
      .withMessage('Please provide your reaction')
      .trim()
      .notEmpty()
      .withMessage('The reaction is not empty')
      .isInt()
      .withMessage('Invalid reaction')
      .toInt(),
    body('postId')
      .exists()
      .withMessage('Please provide the post id')
      .trim()
      .notEmpty()
      .withMessage('The post id is not empty')
      .toInt()
      .isInt()
      .withMessage('Invalid post id'),
    body('userId')
      .exists()
      .withMessage('Please provide the user id')
      .trim()
      .notEmpty()
      .withMessage('The user id is not empty')
      .isInt()
      .withMessage('Invalid user id')
      .toInt(),
  ],
  validatePostId: () => [
    param('postId')
      .trim()
      .notEmpty()
      .withMessage('The postId does not empty')
      .isInt()
      .withMessage('The postId is invalid. It should be a positive integer')
      .toInt(),
  ],
  validatePostReactionId: () => [
    param('postReactionId')
      .trim()
      .notEmpty()
      .withMessage('The postReactionId does not empty')
      .isInt()
      .withMessage('The postReactionId is invalid. It should be a positive integer')
      .toInt(),
  ],
  validateUpdateReactionId: () => [
    body('reactionId')
      .trim()
      .notEmpty()
      .withMessage('The reaction does not empty')
      .isInt()
      .withMessage('The reaction is invalid. It should be a positive integer')
      .toInt(),
  ],
};
