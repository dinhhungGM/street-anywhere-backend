module.exports = {
  createError: (status, statusCode, message) => {
    const error = new Error(message);
    error.status = status;
    error.statusCode = statusCode;
    return error;
  }
};