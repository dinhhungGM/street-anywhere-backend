const helper = require('./../../utils/helper');
const { validationResult } = require('express-validator');
const errorUtils = require('./../../utils/error');

const STATUS = {
  400: 'Error: 400 Bad Request',
  403: 'Error: 403 Forbidden',
  404: 'Error: 404 Not Found',
  500: 'Internal Server Error',
};

module.exports = {
  handleError: (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = STATUS[statusCode];
    const message = err.message;
    const tracing =
      process.env.NODE_ENV === 'production' || statusCode !== 500 ? {} : { tracing: err.stack };
    return res.status(statusCode).json({
      status,
      message,
      ...tracing,
    });
  },
  handleNotFound: (req, _, next) => {
    const notFoundError = errorUtils.createNotFoundError('Not found request url');
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
