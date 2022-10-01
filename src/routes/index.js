const { AuthRoutes } = require('./../features/auth');
const { CategoryRoutes } = require('./../features/category');
const { TagRoutes } = require('./../features/tag');
const { PostRoutes } = require('./../features/post');
const { UserRoutes } = require('./../features/user');
const { CommentRoutes } = require('./../features/comment');
const { ReactionRoutes } = require('./../features/reaction');
const { ErrorController } = require('../features/error');

const createRoutes = (app) => {
  app.use('/api/auth', AuthRoutes);
  app.use('/api/posts', PostRoutes);
  app.use('/api/categories', CategoryRoutes);
  app.use('/api/tags', TagRoutes);
  app.use('/api/users', UserRoutes);
  app.use('/api/comments', CommentRoutes);
  app.use('/api/reactions', ReactionRoutes);
  app.use('*', ErrorController.handleNotFound);
  app.use(ErrorController.handleError);
};

module.exports = createRoutes;
