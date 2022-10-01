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
      .withMessage('Invalid reaction'),
    body('postId')
      .exists()
      .withMessage('Please provide the post id')
      .trim()
      .notEmpty()
      .withMessage('The post id is not empty')
      .isInt()
      .withMessage('Invalid post id'),
    body('userId')
      .exists()
      .withMessage('Please provide the user id')
      .trim()
      .notEmpty()
      .withMessage('The user id is not empty')
      .isInt()
      .withMessage('Invalid user id'),
  ],
  validatePostId: () => [
    param('postId')
      .trim()
      .notEmpty()
      .withMessage('The postId does not empty')
      .isInt()
      .withMessage('The postId is invalid. It should be a positive integer'),
  ],
};
