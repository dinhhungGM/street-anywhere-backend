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
  );

module.exports = router;
