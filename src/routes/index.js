const ErrorHandler = require('./../handler/error');
const authRoutes = require('./authRoutes');

const createRoutes = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('*', ErrorHandler.handleNotFound);
  app.use(ErrorHandler.handleError);
};

module.exports = createRoutes;
