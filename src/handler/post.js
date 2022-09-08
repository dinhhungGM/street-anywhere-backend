const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { mediaSource: MediaSource, media: Media, post: Post } = require('./../models');

module.exports = {
  handleCreateNewPost: catchAsync(async (req, res) => {
    if (!req.file) {
      throw helper.createError(400, 'Please update image or video to continue');
    }
    const { buffer, originalname, size } = req.file;
    const reqPayload = req.body;
    const newPost = await Post.create({
      title: req.reqPayload.title,
    });
    return res.status(201).end();
  }),
};
