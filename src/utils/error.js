module.exports = {
  createBadRequestError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 400;
    return error;
  },
  createNotFoundError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 404;
    return error;
  },
  createForbiddenError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 403;
    return error;
  },
};
