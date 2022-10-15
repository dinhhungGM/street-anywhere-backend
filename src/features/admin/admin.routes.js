const router = require('express').Router();
const { ErrorController } = require('../error');
const AdminController = require('./admin.controller');
const AdminValidators = require('./admin.validators');

router
  .route('/users/:userId')
  .delete(
    AdminValidators.validateAdminUserId(),
    AdminValidators.validateUserId(),
    ErrorController.catchValidationError,
    AdminController.checkIsAdmin,
    AdminController.deleteUser,
  );
router
  .route('/users')
  .get(
    AdminValidators.validateAdminUserId(),
    ErrorController.catchValidationError,
    AdminController.checkIsAdmin,
    AdminController.getAllUsers,
  )
  .post(
    AdminValidators.validateAdminUserId(),
    AdminValidators.validateNewUserPayload(),
    ErrorController.catchValidationError,
    AdminController.checkIsAdmin,
    AdminController.createNewUser,
  );
router
  .route('/roles')
  .get(
    AdminValidators.validateAdminUserId(),
    ErrorController.catchValidationError,
    AdminController.checkIsAdmin,
    AdminController.getAllRoles,
  );
router
  .route('/reactions')
  .get(
    AdminValidators.validateAdminUserId(),
    ErrorController.catchValidationError,
    AdminController.checkIsAdmin,
    AdminController.getAllReactions,
  );

module.exports = router;
