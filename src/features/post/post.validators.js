const { param, body } = require('express-validator');

module.exports = {
  validateNewPostPayload: () => [
    body('title')
      .exists()
      .withMessage('A post must have a title')
      .trim()
      .notEmpty()
      .withMessage('The post title is not empty')
      .isLength({ max: 100 })
      .withMessage('The post title can not be more than 100 characters'),
    body('shortTitle')
      .exists()
      .withMessage('A post must have a short title')
      .trim()
      .notEmpty()
      .withMessage('The short title is not empty')
      .isLength({ max: 50 })
      .withMessage('The short title can not be more than 50 characters'),
    body('location').optional().trim().notEmpty().withMessage('The location does not empty'),
    body('longitude')
      .optional()
      .isNumeric()
      .withMessage('The longitude is invalid. It should be a numeric value')
      .toFloat(),
    body('latitude')
      .optional()
      .isNumeric()
      .withMessage('The latitude is invalid. It should be a numeric value')
      .toFloat(),
    body('tags').optional().isJSON().withMessage('Please provide a stringify of tag arrays'),
    body('categories')
      .optional()
      .isJSON()
      .withMessage('Please provide a stringify of categories arrays'),
    body('type')
      .exists()
      .withMessage('Please provide the type of post')
      .notEmpty()
      .withMessage('Please provide the type of post'),
    body('videoYtbUrl').optional().trim().notEmpty().withMessage('Please provide the youtube url'),
  ],
  validateUserId: () => [
    param('userId')
      .trim()
      .isInt('Please provide a valid user id. It should be a positive integer')
      .toInt(),
  ],
  validatePostId: () => [
    param('id')
      .trim()
      .isInt('Please provide a valid post id. It should be a positive integer')
      .isLength({ min: 0 })
      .withMessage('Please provide a valid post id. It should be a positive integer')
      .toInt(),
  ],
  validateRelevantPostPayload: () => [
    body('categories')
      .exists()
      .withMessage('Please provide categories of post')
      .notEmpty()
      .withMessage('Please provide categories of post'),
    body('hashtags')
      .exists()
      .withMessage('Please provide tags of post')
      .notEmpty()
      .withMessage('Please provide tags of post'),
  ],
  validateUpdatePayload: () => [
    param('id')
      .exists()
      .withMessage('Please provide postId to continue')
      .trim()
      .notEmpty()
      .withMessage('The postId does not empty')
      .isInt()
      .withMessage('The postId is invalid')
      .isLength({ min: 1 })
      .withMessage('The postId can not be a negative value')
      .toInt(),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('The title does not empty')
      .isLength({ max: 100 })
      .withMessage('The title can not have more than 100 characters')
      .matches(/[a-zA-Z0-9]/)
      .withMessage('The title can not contain special character'),
    body('location')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('The address does not empty')
      .matches(/[a-zA-Z0-9]/)
      .withMessage('The address can not contain special character'),
    body('longitude')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('The longitude does not empty')
      .isNumeric()
      .withMessage('The longitude is invalid')
      .toFloat(),
    body('latitude')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('The latitude does not empty')
      .isNumeric()
      .withMessage('The latitude is invalid')
      .toFloat(),
    body('categories')
      .optional()
      .isArray()
      .withMessage('The categories should be an array of categories'),
    body('tags').optional().isArray().withMessage('The tags should be an array of tags'),
  ],
};
