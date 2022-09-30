const { param } = require('express-validator');

module.exports = {
  validateUserId: () => [
    param('id').isNumeric().withMessage('Please provide a valid user id. It should be a positive value'),
  ],
};
