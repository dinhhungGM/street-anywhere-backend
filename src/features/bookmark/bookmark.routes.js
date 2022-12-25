const router = require('express').Router();
const { ErrorController } = require('../error');
const BookmarkController = require('./bookmark.controller');
const BookmarkValidators = require('./bookmark.validators');

router.get(
  '/bookmarked-posts/:userId',
  BookmarkValidators.validateUserId(),
  ErrorController.catchValidationError,
  BookmarkController.getBookmarkedPosts,
);
router.get(
  '/user/:userId',
  BookmarkValidators.validateUserId(),
  ErrorController.catchValidationError,
  BookmarkController.getBookmarkByUserId,
);
router.get(
  '/post/:postId',
  BookmarkValidators.validatePostId(),
  ErrorController.catchValidationError,
  BookmarkController.getBookmarkDetailsByPostId,
);
router.delete(
  '/:bookmarkId',
  BookmarkValidators.validateBookmarkId(),
  ErrorController.catchValidationError,
  BookmarkController.deleteBookmark,
);
router
  .route('')
  .post(
    BookmarkValidators.validateNewBookmarkPayload(),
    ErrorController.catchValidationError,
    BookmarkController.addBookmark,
  );
module.exports = router;
