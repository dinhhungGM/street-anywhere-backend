const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const models = require('./../../models');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports = {
  getAvatar: catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = User.findByPk(+id, {
      raw: true,
      attributes: {
        include: ['imgType', 'photoSource'],
      },
    });
    if (!user) {
      throw helper.createError(404, 'No users found');
    }
    return res.header('Content-Type', user.imgType).status(200).send(user.photoSource);
  }),
  updateUser: catchAsync(async (req, res, next) => {
    const ALLOW_UPDATE_KEYS = ['firstName', 'lastName', 'bio', 'password'];
    const avatar = req.file;
    const { userId } = req.params;
    const userPayload = {};
    for (const key of Object.keys(req.body)) {
      if (_.isNil(req.body[key])) {
        userPayload[key] = req.body[key];
      }
    }
    const user = await models.user.findByPk(+userId);
    if (!user) {
      throw helper.createError(404, 'Not found users');
    }
    if (avatar) {
      user.photoSource = avatar.buffer;
    }

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
    const { comments, bookmarks, profilePhotoUrl, coverImageUrl, ...rest } = user.toJSON();
    return res.status(200).json({
      status: 'Success',
      value: user,
    });
  }),
};
