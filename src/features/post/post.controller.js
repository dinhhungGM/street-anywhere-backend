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
const models = require('./../../models');

const constructPostData = (post) => {
  const { tags, categories, user, reactions, bookmarks, createdAt, updatedAt, imageUrl, ...rest } =
    post.toJSON();
  return {
    ...rest,
    title: stringUtils.toTitleCase(rest.title),
    shortTitle: stringUtils.toTitleCase(rest.title),
    description: rest.description ? decodeURIComponent(rest.description) : null,
    tags: _.map(tags, 'tagName'),
    categories: _.map(categories, 'categoryName'),
    imageUrl: imageUrl || `${ process.env.BACKEND_URL }/posts/media/${ rest.id }`,
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
    let mediaPayload = {};
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
      case 'upload': {
        if (!req.file) {
          throw helper.createError(400, 'Please update image or video to continue');
        }
        const { buffer, size, mimetype } = req.file;
        mediaPayload = {
          mediaSource: buffer,
          size,
          type: mimetype,
        };
      }
      default: {
        mediaPayload = {
          type,
        };
        break;
      }
    }
    const postPayload = { ...restInfo, ...mediaPayload };
    const newPost = await Post.create(postPayload);
    if (type === 'upload') {
      newPost.set({ imageUrl: `${ process.env.BACKEND_URL }/posts/media/${ newPost.id }` });
    }
    await Promise.all([
      newPost.addTags(JSON.parse(tags)),
      newPost.addCategories(JSON.parse(categories)),
      newPost.save(),
    ]);
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
      offset: parseInt(page) ? (page - 1) * pageSize : 0,
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
    return res.header('Content-Type', 'image/png').status(200).send(post.mediaSource);
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
      throw errorUtils.createNotFoundError(postConstants.ERROR_NOT_FOUND_POST);
    }
    return res.status(200).json({
      status: 'Success',
      value: constructPostData(post),
    });
  }),

  getPostByUserId: catchAsync(async (req, res, next) => {
    const { mediatype } = req.query;
    const { userId } = req.params;
    const checkUser = await User.findByPk(+userId);
    if (!checkUser) {
      throw helper.createError(404, 'Not found user');
    }
    const filterMediaType = mediatype ? { type: { [Op.iLike]: `%${ mediatype }%` } } : {};
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      where: {
        userId: +userId,
        ...filterMediaType,
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
    const responseValues = _.map(posts, (post) => constructPostData(post));
    return res.status(200).json({
      status: '200: Ok',
      message: 'Getting post by user id successfully',
      value: responseValues,
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
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
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
          attributes: ['tagName'],
          ...filterByHashTags,
        },
        {
          model: Category,
          attributes: ['categoryName'],
          ...filterByCategories,
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
    const responseValues = _.map(relevantPosts, (post) => constructPostData(post));
    return res.status(200).json({
      status: '200: OK',
      message: 'Get relevant post successfully',
      value: responseValues,
    });
  }),

  getTotalPage: catchAsync(async (req, res) => {
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
    const count = posts.length;
    console.log('count', count);
    return res.status(200).json({
      status: '200: Ok',
      message: 'Counting page successfully',
      value: {
        totalPage: Math.ceil(count / pageSize),
      },
    });
  }),

  findPostBasedOnLocation: catchAsync(async (req, res) => {
    const { long, lat, radius } = req.query;
    const { page = 1 } = req.query;
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      order: [
        ['createdAt', 'desc'],
        ['views', 'desc'],
      ],
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
    let responseValues = _.map(posts, (post) => constructPostData(post));
    responseValues = responseValues.reduce((results, post) => {
      const { location, longitude, latitude } = post;
      const isHasLocation = Boolean(location && longitude && latitude);
      if (!isHasLocation) {
        return results;
      }
      const p1 = { x: +long, y: +lat };
      const p2 = { x: longitude, y: latitude };
      const distance = helper.calculateDistance(p1, p2);
      if (distance <= radius) {
        results.push({
          ...post,
          distance: +distance.toFixed(2),
        });
      }
      return results;
    }, []);
    return res.status(200).json({
      status: '200: Ok',
      message: 'Finding all posts near current position successfully',
      value: responseValues,
    });
  }),

  handleUpdatePost: catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(+id);
    if (!post) {
      throw errorUtils.createNotFoundError(postConstants.ERROR_NOT_FOUND_POST);
    }
    if (!Object.keys(req.body).length) {
      throw errorUtils.createBadRequestError(postConstants.ERROR_CAN_NOT_UPDATE_PORT_WITHOUT_DATA);
    }
    const { AllowableField } = postConstants;
    for (const field of Object.keys(req.body)) {
      const newVal = req.body[field];
      switch (field) {
        case AllowableField.Title: {
          post.set({
            title: stringUtils.toTitleCase(newVal),
            shortTitle: stringUtils.toTitleCase(newVal),
          });
          break;
        }
        case AllowableField.Location: {
          post.set({ location: newVal });
          break;
        }
        case AllowableField.Latitude: {
          post.set({ latitude: +newVal });
          break;
        }
        case AllowableField.Longitude: {
          post.set({ longitude: +newVal });
          break;
        }
        case AllowableField.Desc: {
          post.set({
            description: newVal,
          });
          break;
        }
        case AllowableField.Categories: {
          const currCates = await post.getCategories();
          const listId = _.map(currCates, (item) => {
            const { id } = item.toJSON();
            return id;
          });
          await post.removeCategories(listId);
          if (newVal.length) {
            await post.addCategories(newVal);
          }
          break;
        }
        case AllowableField.Tags: {
          const currTags = await post.getTags();
          const listId = _.map(currTags, (item) => {
            const { id } = item.toJSON();
            return id;
          });
          await post.removeTags(listId);
          if (newVal.length) {
            await post.addTags(newVal);
          }
          break;
        }
        default: {
          throw errorUtils.createBadRequestError(`The ${ field } is not a property of post`);
        }
      }
    }

    post.set({ createdAt: new Date() });
    await post.save();
    return res.status(200).json({
      status: '200: Ok',
      message: 'Updating post successfully',
    });
  }),

  getShorts: catchAsync(async (req, res) => {
    const posts = await Post.findAll({
      attributes: {
        exclude: ['mediaSource', 'updatedAt'],
      },
      where: {
        type: { [Op.iLike]: `%video%` },
      },
      order: [
        ['createdAt', 'desc'],
        ['views', 'desc'],
      ],
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
    const responseValues = _.map(posts, (post) => constructPostData(post));
    return res.status(200).json({
      status: '200: Ok',
      message: 'Getting shorts successfully',
      value: responseValues,
    });
  }),

  getTrendingPost: catchAsync(async (req, res) => {
    const [results] = await models.sequelize.query(
      `
      SELECT
        p2."id",
        p1."title",
        p2."shortTitle",
        p2."description",
        p2."location",
        p2."longitude",
        p2."latitude",
        p2."videoYtbUrl",
        p2."views",
        p2."type",
        p2."userId",
        u."firstName",
        u."lastName",
        u."profilePhotoUrl",
        p1."totalReactions",
        p2."imageUrl",
        p2."createdAt"
      FROM
        (
        SELECT
            t.id as "postId",
            t.title,
            SUM(t."reactionCount") as "totalReactions"
        FROM
            (
                SELECT
                    p.id,
                    p.title,
                    r."reactionType",
                    COUNT(r."reactionType") as "reactionCount"
                FROM
                    posts p
                    JOIN "postReactions" pr ON p.id = pr."postId"
                    JOIN reactions r ON pr."reactionId" = r.id
                WHERE
                    r."reactionType" in ('Love', 'Like')
                GROUP BY
                    p.id,
                    p.title,
                    r."reactionType",
                    r."reactionType"
            ) AS t
        GROUP BY
            t.id,
            t.title
        ORDER BY
            "totalReactions" DESC
        ) AS p1
        JOIN posts p2 ON p1."postId" = p2.id
        JOIN users u ON p2."userId" = u.id
        ORDER BY p1."totalReactions" DESC
      `,
    );
    const responseValues = _.map(results, (data) => {
      const { firstName, lastName, ...rest } = data;
      return {
        ...rest,
        fullName: stringUtils.getFullName(data),
        isHasLocation: PostUtils.isHasLocation(data),
        createdAt: dateUtils.toLocaleString(data.createdAt),
      };
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Handing get trending post successfully',
      value: responseValues,
    });
  }),
};
