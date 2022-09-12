const router = require('express').Router();
const { param, body } = require('express-validator');
const PostHandler = require('./../handler/post');
const ErrorHandler = require('./../handler/error');
const uploadFile = require('./../utils/multer');

router.get(
  '/media/:id',
  param('id', 'Please provide valid Post ID to continue').exists().isNumeric().isInt(),
  ErrorHandler.catchValidationError,
  PostHandler.getMediaSource,
);
router
  .route('')
  .get(PostHandler.getAllPosts)
  .post(
    uploadFile.single('media'),
    body('title', 'The title of post does not empty').exists().notEmpty(),
    body('title', 'The title of post only contains at most 50 characters').isLength({ max: 50 }),
    body('location', 'The location does not empty').exists().notEmpty(),
    body('longitude', 'The longitude does not empty').exists().notEmpty(),
    body('longitude', 'The longitude should be numeric value').isNumeric(),
    body('latitude', 'The latitude does not empty').exists().notEmpty(),
    body('latitude', 'The latitude should be numeric value').isNumeric(),
    body('tags', 'A post should have tags').exists().isArray(),
    body('categories', 'A post should have categories').exists().isArray(),
    ErrorHandler.catchValidationError,
    PostHandler.handleCreateNewPost,
  );
module.exports = router;
