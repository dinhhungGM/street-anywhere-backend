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
} = require('./../../models');
const PostUtils = require('./post.utils');
const { Op } = require('sequelize');
const _ = require('lodash');
const stringUtils = require('./../../utils/string');
const errorUtils = require('./../../utils/error');
const postConstants = require('./post.constants');
const dateUtils = require('./../../utils/date');

const constructPostData = (post) => {
  const { tags, categories, user, reactions, bookmarks, createdAt, updatedAt, ...rest } = post.toJSON();
  return {
    ...rest,
    title: stringUtils.toTitleCase(rest.title),
    shortTitle: stringUtils.toTitleCase(rest.title),
    tags: _.map(tags, 'tagName'),
    categories: _.map(categories, 'categoryName'),
    imageUrl: `${ process.env.BACKEND_URL }/posts/media/${ rest.id }`,
    userId: user.id,
    fullName: stringUtils.getFullName(user),
    profilePhotoUrl: user.profilePhotoUrl,
    createdAt: dateUtils.toLocaleString(createdAt),
    updatedAt: dateUtils.toLocaleString(updatedAt),
    isHasLocation: PostUtils.isHasLocation(post),
    reactions: PostUtils.getReactionDetails(reactions),
    totalReaction: reactions.length,
    bookmarks: PostUtils.getBookmarkDetails(bookmarks),
    totalBookmark: bookmarks.length,
  };
};

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
    const { page, category, tag, search } = req.query;
    const filterSearch = search
      ? {
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${ search }%`,
              },
            },
            {
              shortTitle: {
                [Op.iLike]: `%${ search }%`,
              },
            },
          ],
        },
      }
      : {};
    const filterTag = tag
      ? {
        where: {
          id: {
            [Op.or]: _.map(tag.split(','), (id) => +id),
          },
        },
      }
      : {};
    const filterCategory = category
      ? {
        where: {
          id: {
            [Op.or]: _.map(category.split(','), (id) => +id),
          },
        },
      }
      : {};
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      ...filterSearch,
      order: [['createdAt', 'DESC']],
      limit: 30,
      offset: parseInt(page) ? page * pageSize : 0,
      include: [
        {
          model: Tag,
          attributes: ['tagName'],
          ...filterTag,
        },
        {
          model: Category,
          attributes: ['categoryName'],
          ...filterCategory,
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'profilePhotoUrl'],
        },
        {
          model: Reaction,
          attributes: ['id', 'reactionType'],
        },
        {
          model: Bookmark,
        },
      ],
    });
    const responseValues = _.map(posts, (post) => constructPostData(post));
    return res.status(200).json({
      status: 'Success',
      value: responseValues,
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
        exclude: ['userId', 'mediaSource'],
      },
      include: [
        {
          model: Tag,
          attributes: ['tagName'],
        },
        {
          model: Category,
          attributes: ['categoryName'],
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'profilePhotoUrl'],
        },
        {
          model: Reaction,
          attributes: ['id', 'reactionType'],
        },
        {
          model: Bookmark,
        },
      ],
    });
    if (!post) {
      throw errorUtils.createBadRequestError(postConstants.ERROR_NOT_FOUND_POST);
    }
    return res.status(200).json({
      status: 'Success',
      value: constructPostData(post),
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
    return res.status(200).json({
      status: '200: OK',
      message: 'Incrementing view of post successfully',
    });
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

  getRelevantToPost: catchAsync(async (req, res, next) => {
    const { categories, hashtags, postId } = req.body;
    const filterByCategories =
      categories && categories.length
        ? {
          where: {
            [Op.or]: _.map(categories, (category) => ({
              categoryName: {
                [Op.iLike]: `%${ category }%`,
              },
            })),
          },
        }
        : {};
    const filterByHashTags =
      hashtags && hashtags.length
        ? {
          where: {
            [Op.or]: _.map(hashtags, (tag) => ({
              tagName: {
                [Op.iLike]: `%${ tag }%`,
              },
            })),
          },
        }
        : {};
    const relevantPosts = await Post.findAll({
      attributes: ['id', 'type', 'videoYtbUrl', 'views', 'createdAt'],
      where: {
        id: {
          [Op.ne]: postId,
        },
      },
      order: [
        ['views', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      limit: 10,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'profilePhotoUrl'],
        },
        {
          model: Tag,
          ...filterByHashTags,
        },
        {
          model: Category,
          ...filterByCategories,
        },
      ],
    });
    const responseValues = _.map(relevantPosts, (postInstance) => {
      const post = postInstance.toJSON();
      return {
        id: post.id,
        type: post.type,
        userId: post.user.id,
        fullName: stringUtils.toTitleCase(`${ post.user.firstName.trim() } ${ post.user.lastName.trim() }`),
        profilePhotoUrl: post.user.profilePhotoUrl,
        imageUrl: PostUtils.getImageUrl(post),
        videoYtbUrl: post.videoYtbUrl,
      };
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Get relevant post successfully',
      value: responseValues,
    });
  }),
};
