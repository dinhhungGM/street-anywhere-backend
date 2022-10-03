const router = require('express').Router();
const { ErrorController } = require('../error');
const PostController = require('./post.controller');
const PostValidators = require('./post.validators');
const uploadFile = require('./../../utils/multer');

router.patch(
  '/addView/:id',
  PostValidators.validatePostId(),
  ErrorController.catchValidationError,
  PostController.incrementView,
);
router.get(
  '/user/:userId',
  PostValidators.validateUserId(),
  ErrorController.catchValidationError,
  PostController.getPostByUserId,
);
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
