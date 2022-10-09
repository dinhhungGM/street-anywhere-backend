const catchAsync = require('../../utils/catchAsync');
const { user: User, post: Post, bookmark: Bookmark, tag: Tag, category: Category } = require('./../../models');
const _ = require('lodash');
const helpers = require('./../../utils/helper');
const BookmarkUtils = require('./bookmark.utils');

module.exports = {
  addBookmark: catchAsync(async (req, res, next) => {
    const { userId, postId } = req.body;
    const [checkUser, checkPost] = await Promise.all([User.findByPk(+userId), Post.findByPk(+postId)]);
    if (_.isNil(checkUser)) {
      throw helpers.createError(400, 'The user does not exist');
    }
    if (_.isNil(checkPost)) {
      throw helpers.createError(400, 'The post does not exist');
    }
    await Bookmark.create(req.body);
    return res.status(201).json({
      status: 'Success',
      message: 'Add bookmark successfully',
    });
  }),
  getBookmarkByUserId: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const allBookmarks = await Bookmark.findAndCountAll({
      where: {
        userId: +userId,
      },
      attributes: {
        exclude: ['userId', 'postId'],
      },
      include: [
        {
          model: Post,
          attributes: {
            exclude: ['mediaSource', 'userId', 'createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Tag,
            },
            {
              model: Category,
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: BookmarkUtils.constructResponseForGetStoredPost(allBookmarks),
    });
  }),
  deleteBookmark: catchAsync(async (req, res, next) => {
    const { bookmarkId } = req.params;
    const deletedCount = await Bookmark.destroy({
      where: {
        id: +bookmarkId,
      },
    });
    if (!deletedCount) {
      throw helpers.createError(404, 'No bookmarks found');
    }
    return res.status(204).send();
  }),
  getBookmarkDetailsByPostId: catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const bookmarkDetails = await Bookmark.findAll({
      where: {
        postId,
      },
    });
    return res.status(200).json({
      status: 'Success',
      value: BookmarkUtils.constructResponseForGettingBookmarkDetails(bookmarkDetails),
    });
  }),
};
