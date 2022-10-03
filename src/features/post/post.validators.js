const { param, body } = require('express-validator');

module.exports = {
  validatePostId: () => [
    param('id').isInt().withMessage('Please provide valid post id. It should be a positive integer'),
  ],
  validateNewPostPayload: () => [
    body('title')
      .exists()
      .withMessage('A post must have a title')
      .trim()
      .notEmpty('The post title is not empty')
      .isLength({ max: 100 })
      .withMessage('The post title can not be more than 100 characters'),
    body('shortTitle')
      .exists()
      .withMessage('A post must have a short title')
      .trim()
      .notEmpty('The short title is not empty')
      .isLength({ max: 50 })
      .withMessage('The short title can not be more than 50 characters'),
    body('location')
      .exists()
      .withMessage('Please provide you location you wanna share')
      .trim()
      .notEmpty()
      .withMessage('The location is not empty'),
    body('longitude')
      .exists()
      .withMessage('Please provide the longitude of location')
      .notEmpty()
      .withMessage('The longitude is not empty')
      .isNumeric()
      .withMessage('The longitude is invalid. It should be a numeric value'),
    body('latitude')
      .exists()
      .withMessage('Please provide the latitude of location')
      .notEmpty()
      .withMessage('The latitude is not empty')
      .isNumeric()
      .withMessage('The latitude is invalid. It should be a numeric value'),
    body('tags')
      .exists()
      .withMessage('A post must have some tags')
      .isJSON()
      .withMessage('Please provide a stringify of tag arrays'),
    body('categories')
      .exists()
      .withMessage('A post must have some categories')
      .isJSON()
      .withMessage('Please provide a stringify of categories arrays'),
    body('type').exists().withMessage('Please provide the type of post').notEmpty('Please provide the type of post'),
    body('videoYtbUrl').optional().trim().notEmpty('Please provide the youtube url'),
  ],
  validateUserId: () => [
    param('userId').trim().isInt('Please provide a valid user id. It should be a positive integer'),
  ],
};
