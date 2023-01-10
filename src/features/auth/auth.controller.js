require('dotenv').config();
const _ = require('lodash');
const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const models = require('./../../models');
const authUtils = require('./auth.utils');
const errorUtils = require('./../../utils/error');

module.exports = {
  handleSignIn: catchAsync(async (req, res, next) => {
    const requestPayload = req.body;
    const findingUser = await models.user.findOne({
      where: { username: requestPayload.username },
      attributes: {
        exclude: ['photoSource', 'rankId', 'imgType', 'coverImageSrc'],
      },
      include: [{ model: models.role }, { model: models.rank }],
    });
    if (_.isNil(findingUser)) {
      throw helper.createError(404, 'Not found user');
    }
    const isPasswordMatch = await helper.isPasswordMatch(
      requestPayload.password,
      findingUser.password,
    );
    if (!isPasswordMatch) {
      throw helper.createError(403, 'Username or password is incorrect');
    }
    return res.status(200).json({
      status: 'Success',
      value: authUtils.constructResponseSignInPayload(findingUser.toJSON()),
    });
  }),

  handleSignUp: catchAsync(async (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;
    const existedUser = await models.user.findOne({ raw: true, where: { username } });
    if (!_.isNil(existedUser)) {
      throw helper.createError(400, 'Username was existed. Please select another username');
    }
    const newUser = await models.user.create({ username, password, firstName, lastName });
    const role = await newUser.getRole();
    return res.status(201).json({
      status: 'Success',
      value: authUtils.constructResponseSignUp({ ...newUser.toJSON(), role: role.toJSON() }),
    });
  }),

  handleSignInByGoogle: catchAsync(async (req, res) => {
    const { firstName, lastName, email, profilePhotoUrl, ...rest } = req.body;
    if (Object.keys(rest).length) {
      const invalidFields = Object.keys(rest).join(',');
      throw errorUtils.createBadRequestError(`Invalid fields: ${invalidFields}`);
    }
    const user = await models.user.findOne({
      where: {
        email,
      },
      include: [
        {
          model: models.role,
        },
      ],
    });
    if (!user) {
      const newUser = await models.user.create({
        username: email,
        password: email,
        firstName,
        lastName,
        email,
        profilePhotoUrl,
        rankId: +process.env.RANK_GOLD_1,
        roleId: +process.env.ROLE_END_USER,
      });
      const [role, rank] = await Promise.all([newUser.getRole(), newUser.getRank()]);
      const { password, coverImageSrc, photoSource, imgType, rankId, ...user } = newUser.toJSON();
      return res.status(200).json({
        status: 'Success',
        value: authUtils.constructResponseSignInPayload({ ...user, role, rank }),
      });
    } else {
      return res.status(200).json({
        status: 'Success',
        value: authUtils.constructResponseSignInPayload(user.toJSON()),
      });
    }
  }),
};
