class ErrorHandler {
  handleError = (err, req, res, next) => {
    const status = err.status || 'Error';
    const statusCode = err.statusCode || 500;
    const message = err.message;
    return res.status(statusCode).json({
      status,
      message,
    });
  };
}
