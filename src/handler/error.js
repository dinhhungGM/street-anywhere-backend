const helper = require('./../utils/helper');

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
  handleNotFound: (req, res, next) => {
    const notFoundError = helper.createError('Error', 404, 'Not found request url');
    return next(notFoundError);
  },
};
