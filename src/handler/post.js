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
    const newPost = await Post.create({ title, location, longitude, latitude, userId });
    const [newMedium] = await Promise.all([
      newPost.createMedium({ title: originalname, type: mimetype, size }),
      newPost.addTags([1, 2]),
      newPost.addCategories([1, 2]),
    ]);
    await newMedium.createMediaSource({ sources: buffer });
    return res.status(201).json({
      status: 'Success',
      message: 'Create post successfully'
    });
  }),
};
