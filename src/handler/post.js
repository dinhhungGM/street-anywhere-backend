const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { post: Post } = require('./../models');

module.exports = {
  handleCreateNewPost: catchAsync(async (req, res) => {
    if (!req.file) {
      throw helper.createError(400, 'Please update image or video to continue');
    }
    const { buffer, size, mimetype } = req.file;
    const { tags, categories, ...restInfo } = req.body;
    const postPayload = {
      ...restInfo,
      mediaSource: buffer,
      size,
      type: mimetype,
    };
    const newPost = await Post.create(postPayload);
    await Promise.all([newPost.addTags(tags), newPost.addCategories(categories)]);
    return res.status(201).json({
      status: 'Success',
      message: 'Create a new post successfully',
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
  getMediaSource: catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(+id, {
      raw: true,
      attributes: {
        include: ['type', 'mediaSource'],
      },
    });
    if (!post) {
      throw helper.createError(404, 'No media source found!');
    }
    return res.header('Content-Type', post.type).status(200).send(post.mediaSource);
  }),
};
