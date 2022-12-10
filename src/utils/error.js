module.exports = {
  createBadRequestError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 400;
    error.status = 'Error: 400 Bad Request';
    return error;
  },
  createNotFoundError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 404;
    error.status = 'Error: 404 Not Found';
    return error;
  },
  createForbiddenError: (msg) => {
    const error = new Error(msg);
    error.statusCode = 403;
    error.status = 'Error: 403 Forbidden';
    return error;
  },
};
