const { body, param } = require('express-validator');

module.exports = {
  validateUserIdAndFollowerId: () => [
    body('userId')
      .exists()
      .withMessage('Please provide userId to continue')
      .trim()
      .notEmpty()
      .withMessage('The userId does not empty')
      .isInt()
      .withMessage('The userId is invalid')
      .isLength({ min: 1 })
      .withMessage('The userId is invalid'),
    body('followerId')
      .exists()
      .withMessage('Please provide followerId to continue')
      .trim()
      .notEmpty()
      .withMessage('The followerId does not empty')
      .isInt()
      .withMessage('The followerId is invalid')
      .isLength({ min: 1 })
      .withMessage('The followerId is invalid'),
  ],
  validateFollowerId: () => [
    param('followerId')
      .exists()
      .withMessage('Please provide followerId to continue')
      .trim()
      .notEmpty()
      .withMessage('The followerId does not empty')
      .isInt()
      .withMessage('The followerId is invalid')
      .isLength({ min: 1 })
      .withMessage('The followerId is invalid')
      .toInt(),
  ],
};
