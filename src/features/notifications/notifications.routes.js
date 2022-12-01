const router = require('express').Router();
const NotificationController = require('./notification.controller');
const NotificationValidators = require('./notifications.validators');
const { ErrorController } = require('./../error');

router
  .route('/users/:userId')
  .get(
    NotificationValidators.validateUserId(),
    ErrorController.catchValidationError,
    NotificationController.getNotifications,
  );
router
  .route('/:notificationId')
  .patch(
    NotificationValidators.validateNotificationId(),
    ErrorController.catchValidationError,
    NotificationController.updateStatus,
  );
router
  .route('')
  .post(
    NotificationValidators.validateNotificationPayload(),
    ErrorController.catchValidationError,
    NotificationController.createNewNotification,
  );
router.use('*', ErrorController.handleNotFound);
module.exports = router;
