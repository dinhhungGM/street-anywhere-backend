const { body, param } = require('express-validator');

module.exports = {
  validateNewBookmarkPayload: () => [
    body('userId')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Please provide userId to continue')
      .isInt()
      .withMessage('The userId is invalid. It should be a positive integer'),
    body('postId')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Please provide postID to continue')
      .isInt()
      .withMessage('The postID is invalid. It should be a positive integer'),
  ],
  validateBookmarkId: () => [
    param('bookmarkId')
      .trim()
      .isInt()
      .withMessage('The bookmarkId is invalid. It should be a positive integer')
      .toInt(),
  ],
  validateUserId: () => [
    param('userId').trim().isInt().withMessage('The userId is invalid. It should be a positive integer').toInt(),
  ],
  validatePostId: () => [
    param('postId').trim().isInt().withMessage('The userId is invalid. It should be a positive integer').toInt(),
  ],
};
