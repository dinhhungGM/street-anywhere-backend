const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const {
  post: Post,
  tag: Tag,
  category: Category,
  user: User,
  reaction: Reaction,
  bookmark: Bookmark,
  comment: Comment,
  postReaction,
} = require('./../../models');
const PostUtils = require('./post.utils');
const { Op } = require('sequelize');
const _ = require('lodash');

module.exports = {
  handleCreateNewPost: catchAsync(async (req, res) => {
    const { tags, categories, type, videoYtbUrl, ...restInfo } = req.body;
    let mediaPayload;
    switch (type) {
      case 'video': {
        if (!videoYtbUrl) {
          throw helper.createError(400, 'Please provide video youtube url');
        }
        mediaPayload = {
          mediaSource: null,
          size: null,
          videoYtbUrl,
          type,
        };
        break;
      }
      default: {
        if (!type) {
          throw helper.createError(400, 'Please provide the type of post');
        }
        if (!req.file) {
          throw helper.createError(400, 'Please update image or video to continue');
        }
        const { buffer, size, mimetype } = req.file;
        mediaPayload = {
          mediaSource: buffer,
          size,
          type: mimetype,
        };
        break;
      }
    }
    const postPayload = { ...restInfo, ...mediaPayload };
    const newPost = await Post.create(postPayload);
    await Promise.all([newPost.addTags(JSON.parse(tags)), newPost.addCategories(JSON.parse(categories))]);
    return res.status(201).json({
      status: 'Success',
      message: 'Create a new post successfully',
      value: newPost,
    });
  }),

  getAllPosts: catchAsync(async (req, res) => {
    const pageSize = 30;
    const { page, category, tag } = req.query;
    const filterTag = tag && {
      where: {
        id: tag,
      },
    };
    const filterCategory = category && {
      where: {
        id: category,
      },
    };
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      order: [['createdAt', 'DESC']],
      limit: 30,
      offset: parseInt(page) ? page * pageSize : 0,
      include: [
        {
          model: Tag,
          ...filterTag,
        },
        {
          model: Category,
          ...filterCategory,
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'profilePhotoUrl']
        },
        {
          model: Reaction,
        },
        {
          model: Bookmark,
        },
        {
          model: Comment,
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.preparePostData(posts),
    });
  }),

  getMediaSource: catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({
      raw: true,
      attributes: {
        include: ['type', 'mediaSource'],
      },
      where: {
        type: {
          [Op.iLike]: '%image%',
        },
        id: +id,
      },
    });
    if (!post) {
      throw helper.createError(404, 'The post does not have image!');
    }
    return res.header('Content-Type', post.type).status(200).send(post.mediaSource);
  }),

  getPostById: catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(+id, {
      attributes: {
        exclude: ['mediaSource'],
      },
      include: [
        {
          model: Tag,
        },
        {
          model: Category,
        },
        {
          model: User,
        },
        {
          model: Reaction,
        },
      ],
    });
    if (!post) {
      throw helper.createError(404, 'No posts found');
    }
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.constructResponseValueForGetPostByPostId(post),
    });
  }),

  getPostByUserId: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const checkUser = await User.findByPk(+userId);
    if (!checkUser) {
      throw helper.createError(404, 'Not found user');
    }
    const posts = await Post.findAndCountAll({
      where: {
        userId: +userId,
      },
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
        },
        {
          model: Reaction,
        },
        {
          model: Bookmark,
        },
        {
          model: Comment,
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.constructResponseValueForGetPostByUserId(posts),
    });
  }),

  incrementView: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findByPk(+id);
    if (!post) {
      throw helper.createError(404, 'Not found post');
    }
    await post.increment({
      views: 1,
    });
    return res.status(204).send();
  }),

  getTopPosts: catchAsync(async (req, res, next) => {
    const topPosts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      order: [['views', 'DESC']],
      limit: 5,
      include: [
        {
          model: Tag,
        },
        {
          model: Category,
        },
        {
          model: User,
          attributes: ['id', 'fullName', 'firstName', 'lastName', 'profilePhotoUrl'],
        },
        {
          model: Reaction,
          attributes: ['id'],
        },
        {
          model: Bookmark,
          attributes: ['id'],
        },
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.preparePostData(topPosts),
    });
  }),

  getShorts: catchAsync(async (req, res, next) => {
    const shorts = await Post.findAll({
      where: {
        type: 'video',
      },
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      order: [['views', 'DESC']],
      include: [
        {
          model: Tag,
        },
        {
          model: Category,
        },
        {
          model: User,
          attributes: ['id', 'fullName', 'firstName', 'lastName', 'profilePhotoUrl'],
        },
        {
          model: Reaction,
          attributes: ['id'],
        },
        {
          model: Bookmark,
          attributes: ['id'],
        },
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.preparePostData(shorts),
    });
  }),

  getPostByReactions: catchAsync(async (req, res, next) => {
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Tag,
        },
        {
          model: Category,
        },
        {
          model: User,
        },
        {
          model: Reaction,
          required: true, // INNER JOIN
        },
        {
          model: Bookmark,
        },
        {
          model: Comment,
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: PostUtils.preparePostData(posts),
    });
  }),

  deletePost: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findByPk(+id);
    if (_.isNil(post)) {
      throw helper.createError(404, 'Not found post');
    }
    await post.destroy();
    return res.status(204).send();
  }),
};
