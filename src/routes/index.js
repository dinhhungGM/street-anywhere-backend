const ErrorHandler = require('./../handler/error');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const categoryRoutes = require('./categoryRoutes');
const tagRoutes = require('./tagRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

const createRoutes = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/comments', commentRoutes);
  app.use('/api/users', userRoutes);
  app.use('*', ErrorHandler.handleNotFound);
  app.use(ErrorHandler.handleError);
};

module.exports = createRoutes;
