const router = require('express').Router();
const { ErrorController } = require('../error');
const PostController = require('./post.controller');
const PostValidators = require('./post.validators');
const uploadFile = require('./../../utils/multer');

router.get(
  '/media/:id',
  PostValidators.validatePostId(),
  ErrorController.catchValidationError,
  PostController.getMediaSource,
);
router.get('/:id', PostValidators.validatePostId(), ErrorController.catchValidationError, PostController.getPostById);
router
  .route('')
  .get(PostController.getAllPosts)
  .post(
    uploadFile.single('media'),
    PostValidators.validateNewPostPayload(),
    ErrorController.catchValidationError,
    PostController.handleCreateNewPost,
  );
module.exports = router;
