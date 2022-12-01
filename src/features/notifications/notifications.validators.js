const { body, param } = require('express-validator');

module.exports = {
  validateNotificationPayload: () => [
    body('type')
      .exists()
      .withMessage('Please provide the notification type')
      .trim()
      .notEmpty()
      .withMessage('The notification type does not empty')
      .isIn(['reacted', 'commented'])
      .withMessage('The notification type is invalid'),
    body('userId')
      .exists()
      .withMessage('Please provide userId')
      .notEmpty()
      .withMessage('The userId does not empty')
      .isInt()
      .withMessage("The userId is invalid. It's not a number")
      .isLength({ min: 0 })
      .withMessage('The userId is invalid. It must be more than 0')
      .toInt(),
    body('postId')
      .exists()
      .withMessage('Please provide postId')
      .notEmpty()
      .withMessage('The postId does not empty')
      .isInt()
      .withMessage("The postId is invalid. It's not a number")
      .isLength({ min: 0 })
      .withMessage('The postId is invalid. It must be more than 0')
      .toInt(),
  ],
  validateUserId: () => [
    param('userId')
      .exists()
      .withMessage('Please provide userId')
      .notEmpty()
      .withMessage('The userId does not empty')
      .isInt()
      .withMessage("The userId is invalid. It's not a number")
      .isLength({ min: 0 })
      .withMessage('The userId is invalid. It must be more than 0')
      .toInt(),
  ],
};
