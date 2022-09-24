const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { post: Post, tag: Tag, category: Category, user: User } = require('./../models');
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
    });
  }),

  getAllPosts: catchAsync(async (req, res) => {
    const { page } = req.query;
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource'],
      },
      order: [['createdAt', 'DESC']],
      limit: 30,
      offset: parseInt(page) ? page * pageSize : 0,
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
      ],
    });
    const responseValues = _.map(posts, (post) => {
      const {
        dataValues: postDataValues,
        tags,
        categories,
        user: { dataValues: userInfo },
      } = post;
      return {
        ...postDataValues,
        imageUrl:
          postDataValues.type === 'video' ? null : `${process.env.BACKEND_URL}/posts/media/${postDataValues.id}`,
        tags: _.map(tags, 'tagName'),
        categories: _.map(categories, 'categoryName'),
        user: {
          userId: userInfo.id,
          fullName: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`,
          profilePhotoUrl: userInfo.profilePhotoUrl || `${process.env.BACKEND_URL}/static/images/avatar.png`,
        },
      };
    });
    return res.status(200).json({
      status: 'Success',
      value: responseValues,
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
      ],
    });
    if (!post) {
      throw helper.createError(404, 'No posts found');
    }
    const {
      dataValues: postDataValues,
      tags,
      categories,
      user: { dataValues: userInfo },
    } = post;
    const responseValue = {
      ...postDataValues,
      imageUrl: `${process.env.BACKEND_URL}/posts/media/${postDataValues.id}`,
      tags: _.map(tags, 'tagName'),
      categories: _.map(categories, 'categoryName'),
      user: {
        id: userInfo.id,
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
        profilePhotoUrl: userInfo.profilePhotoUrl || `${process.env.BACKEND_URL}/static/images/avatar.png`,
      },
    };
    return res.status(200).json({
      status: 'Success',
      value: responseValue,
    });
  }),
};
