const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { post: Post } = require('./../models');

module.exports = {
  handleCreateNewPost: catchAsync(async (req, res) => {
    if (!req.file) {
      throw helper.createError(400, 'Please update image or video to continue');
    }
    const { buffer, originalname, size, mimetype } = req.file;
    const { title, location, longitude, latitude, tags, categories, userId } = req.body;
    return res.status(201).json({
      message: 'Status',
    });
  }),
  getAllPosts: catchAsync(async (req, res) => {
    const { page } = req.query;
    const posts = await Post.findAll({
      raw: true,
      orderBy: ['createdAt'],
      limit: 30,
      offset: parseInt(page) ? page * pageSize : 0,
    });
    return res.status(200).json({
      status: 'Success',
      value: posts,
    });
  }),
};
