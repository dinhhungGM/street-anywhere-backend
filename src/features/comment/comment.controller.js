const _ = require('lodash');
const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const { comment: Comment, post: Post, user: User } = require('./../../models');
const CommentUtils = require('./comment.utils');

module.exports = {
  createComment: catchAsync(async (req, res, next) => {
    const { postId: postIdInParam } = req.params;
    const { userId, postId: postIdInBody } = req.body;
    if (postIdInParam !== postIdInBody) {
      throw helper.createError(400, 'The post id in param and body are not match');
    }
    const [checkPost, checkUser] = await Promise.all([Post.findByPk(+postIdInBody), User.findByPk(+userId)]);
    if (_.isNil(checkPost) || _.isNil(checkUser)) {
      let errMsg;
      if (_.isNil(checkPost)) {
        errMsg = 'The post which you wanna comment is not found';
      } else {
        errMsg = 'The user who is commenting is not exist';
      }
      throw helper.createError(400, errMsg);
    }
    await Comment.create(req.body);
    return res.status(201).json({
      status: 'Success',
      message: 'Create successfully',
    });
  }),

  getCommentsByPostId: catchAsync(async (req, res, next) => {
    const PAGE_SIZE = 6;
    const { postId } = req.params;
    const { page } = req.query;
    const comments = await Comment.findAndCountAll({
      where: {
        postId: +postId,
      },
      order: [['createdAt', 'DESC']],
      limit: PAGE_SIZE,
      offset: parseInt(page) ? (page - 1) * PAGE_SIZE : 0,
      include: [
        {
          model: User,
          attributes: ['profilePhotoUrl', 'fullName', 'rankId', 'firstName', 'lastName'],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      message: 'Get data successfully',
      value: {
        commentCount: comments.count,
        commentList: CommentUtils.buildResForGettingCommentByPostId(comments.rows),
      },
    });
  }),

  deleteComment: catchAsync(async (req, res, next) => {
    const { commentId } = req.params;
    const count = await Comment.destroy({ where: { id: +commentId } });
    if (!count) {
      throw helper.createError(404, 'No comments found');
    }
    return res.status(204).end();
  }),

  updateCommentByCommentId: catchAsync(async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const count = await Comment.update(
      {
        content,
        updatedAt: new Date(),
      },
      {
        where: {
          id: +commentId,
        },
      },
    );
    if (!count) {
      throw helper.createError(404, 'Not found your comment to update');
    }
    return res.status(204).end();
  }),
};
