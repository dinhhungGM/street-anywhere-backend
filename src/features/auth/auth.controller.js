const _ = require('lodash');
const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const models = require('./../../models');
const authUtils = require('./auth.utils');

module.exports = {
  handleSignIn: catchAsync(async (req, res, next) => {
    const requestPayload = req.body;
    const findingUser = await models.user.findOne({
      where: { username: requestPayload.username },
      attributes: {
        exclude: ['photoSource', 'rankId', 'imgType'],
      },
      include: [{ model: models.role }, { model: models.rank }],
    });
    if (_.isNil(findingUser)) {
      throw helper.createError(404, 'Username or password is incorrect');
    }
    const isPasswordMatch = await helper.isPasswordMatch(requestPayload.password, findingUser.password);
    if (!isPasswordMatch) {
      throw helper.createError(403, 'Username or password is incorrect');
    }
    return res.status(200).json({
      status: 'Success',
      value: authUtils.constructResponseSignInPayload(findingUser.toJSON()),
    });
  }),

  handleSignUp: catchAsync(async (req, res, next) => {
    const reqPayload = req.body;
    const existedUser = await models.user.findOne({ raw: true, where: { username: reqPayload.username } });
    if (!_.isNil(existedUser)) {
      throw helper.createError(400, 'Username was existed. Please select another username');
    }
    const newUser = await models.user.create(reqPayload);
    const role = await newUser.getRole();
    return res.status(201).json({
      status: 'Success',
      value: authUtils.constructResponseSignUp({ ...newUser.toJSON(), role: role.toJSON() }),
    });
  }),
};
