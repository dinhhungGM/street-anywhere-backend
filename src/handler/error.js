const helper = require('./../utils/helper');
const { validationResult } = require('express-validator');

module.exports = {
  handleError: (err, req, res, next) => {
    const status = err.status || 'Error';
    const statusCode = err.statusCode || 500;
    const message = err.message;
    return res.status(statusCode).json({
      status,
      message,
    });
  },
  handleNotFound: (req, _, next) => {
    const notFoundError = helper.createError('Error', 404, 'Not found request url');
    return next(notFoundError);
  },
  catchValidationError: (req, _, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      const detailError = helper.createError(400, firstError.msg);
      return next(detailError);
    }
    return next();
  },
};
