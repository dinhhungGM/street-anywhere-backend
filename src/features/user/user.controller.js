const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const models = require('./../../models');
const _ = require('lodash');
const path = require('path');
const errorUtils = require('./../../utils/error');
const userConstants = require('./user.constants');
const stringUtils = require('./../../utils/string');

module.exports = {
  getAvatar: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(userId, {
      raw: true,
      attributes: {
        include: ['imgType', 'photoSource'],
      },
    });
    if (!user) {
      throw helper.createError(404, 'No users found');
    }
    if (!user.imgType && !user.photoSource) {
      return res
        .status(200)
        .sendFile(path.resolve(__dirname, 'src', 'public', 'images', 'avatar.png'));
    }
    return res.header('Content-Type', user.imgType).status(200).send(user.photoSource);
  }),
  updateUser: catchAsync(async (req, res, next) => {
    const UPDATE_TYPE = {
      avatar: 'file',
      coverImage: 'file',
      bio: 'text',
      firstName: 'text',
      lastName: 'text',
      phone: 'text',
      email: 'text',
      password: 'password',
      description: 'text',
    };
    const { userId } = req.params;
    let newInfo = {};
    for (const field in req.body) {
      const value = req.body[field];
      const updateType = UPDATE_TYPE[field];
      switch (updateType) {
        case 'password': {
          newInfo[field] = await helper.hashPassword(value);
          break;
        }
        case 'text': {
          newInfo[field] = value;
          break;
        }
        case 'file': {
          let imageImageInfo = {};
          const file = req.file;
          if (_.isNil(file)) {
            throw helper.createError(400, `The ${ field } need to a upload file to continue`);
          }
          if (field === 'avatar') {
            imageImageInfo = {
              photoSource: file.buffer,
              profilePhotoUrl: `${ process.env.BACKEND_URL }/users/avatar/${ userId }`,
              imgType: file.mimetype,
            };
          }
          if (field === 'coverImage') {
            imageImageInfo = {
              coverImageSrc: file.buffer,
              coverImageUrl: `${ process.env.BACKEND_URL }/users/coverImage/${ userId }`,
              coverImageType: file.mimetype,
            };
          }
          newInfo = {
            ...newInfo,
            ...imageImageInfo,
          };
          break;
        }
        default: {
          throw errorUtils.createBadRequestError(`The ${ field } is not a invalid property of user`);
        }
      }
    }
    const user = await models.user.findByPk(+userId);
    if (!user) {
      throw helper.createError(404, 'Not found users');
    }
    user.set(newInfo);
    await user.save();
    return res.status(200).json({
      status: 'Success',
      message: 'Update user successfully',
    });
  }),
  getProfileOfUser: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    let user = await models.user.findByPk(+userId, {
      attributes: {
        exclude: ['password', 'coverImageSrc', 'photoSource'],
      },
      include: [
        {
          model: models.post,
          attributes: {
            exclude: ['mediaSource'],
          },
          include: [
            {
              model: models.comment,
            },
            {
              model: models.reaction,
            },
            {
              model: models.bookmark,
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: user,
    });
  }),
  getCoverImage: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(userId, {
      raw: true,
      attributes: {
        include: ['coverImageType', 'coverImageSrc'],
      },
    });
    if (!user) {
      throw helper.createError(404, 'No users found');
    }
    return res.header('Content-Type', user.coverImageType).status(200).send(user.coverImageSrc);
  }),
  getReactedPostOfUser: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(+userId);
    if (_.isNil(user)) {
      throw errorUtils.createNotFoundError(userConstants.ERROR_NOT_FOUND_USER);
    }
    const postReacted = await models.postReaction.findAll({
      where: {
        userId: +userId,
      },
      include: [
        {
          model: models.reaction,
          attributes: ['reactionType'],
        },
      ],
    });
    const responseValues = _.map(postReacted, (postReactedInstance) => {
      const { reaction, ...rest } = postReactedInstance.toJSON();
      return {
        postReactionId: rest.id,
        postId: rest.postId,
        reactionType: reaction.reactionType,
      };
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Get reacted post successfully',
      value: responseValues,
    });
  }),
  getBookmarkedPostOfUser: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(+userId);
    if (_.isNil(user)) {
      throw errorUtils.createNotFoundError(userConstants.ERROR_NOT_FOUND_USER);
    }
    const bookmarks = await models.bookmark.findAll({
      where: {
        userId: +userId,
      },
    });
    const responseValues = _.map(bookmarks, (bookmarkInstance) => {
      const { id, ...rest } = bookmarkInstance.toJSON();
      return {
        bookmarkId: id,
        ...rest,
      };
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Get bookmarked post successfully',
      value: responseValues,
    });
  }),

  getFollowingUsers: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(+userId);
    if (_.isNil(user)) {
      throw errorUtils.createNotFoundError(userConstants.ERROR_NOT_FOUND_USER);
    }
    const followingUsers = await models.follower.findAll({
      where: {
        userId: +userId,
      },
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Getting following users successfully',
      value: followingUsers,
    });
  }),

  getFollowers: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(+userId);
    if (_.isNil(user)) {
      throw errorUtils.createNotFoundError(userConstants.ERROR_NOT_FOUND_USER);
    }
    const [results] = await models.sequelize.query(
      `SELECT 
        u.id as "userId", 
        u."firstName", 
        u."lastName", 
        u."profilePhotoUrl" 
      FROM 
        followers f 
      JOIN 
        users u 
      ON 
        u.id = f."userId" 
      WHERE 
        f."followerId" = ${ userId }`,
    );
    const responseValues = _.map(results, (data) => {
      const { firstName, lastName, ...rest } = data;
      return {
        ...rest,
        fullName: stringUtils.getFullName(data),
      };
    });
    return res.status(200).json({
      status: '200: OK',
      message: 'Getting followers successfully',
      value: responseValues,
    });
  }),
};
