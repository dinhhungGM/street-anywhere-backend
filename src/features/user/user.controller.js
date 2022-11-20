const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const models = require('./../../models');
const _ = require('lodash');
const path = require('path');

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
      return res.status(200).sendFile(path.resolve(__dirname, 'src', 'public', 'images', 'avatar.png'));
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
          throw helper.createError(400, `The ${ field } is not a invalid property of user`);
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
};
