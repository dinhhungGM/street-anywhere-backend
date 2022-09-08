const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { comment: Comment } = require('./../models');

module.exports = {
  createComment: catchAsync(async (req, res) => {
    await Comment.create(req.body);
    return res.status(201).json({
      status: 'Success',
      message: 'Create successfully',
    });
  }),
  getCommentsByPostId: catchAsync(async (req, res) => {
    const { id } = req.paramsl;
    const comments = await Comment.findAll({
      raw: true,
      where: {
        postId: id,
      },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      status: 'Success',
      message: 'Get data successfully',
      value: comments,
    });
  }),
  updateComment: catchAsync(async (req, res) => {
    const { id } = req.params;
    const count = await Comment.update(req.body, {
      where: { id },
    });
    if (!count) {
      throw helper.createError(404, 'No comments found');
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Update successfully',
    });
  }),
  deleteComment: catchAsync(async (req, res) => {
    const { id } = req.params;
    const count = await Comment.delete({ where: { id } });
    if (!count) {
      throw helper.createError(404, 'No comments found');
    }
    return res.status(204).end();
  }),
};
