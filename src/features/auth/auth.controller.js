const _ = require('lodash');
const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/catchAsync');
const { user: User } = require('./../../models');

module.exports = {
  handleSignIn: catchAsync(async (req, res, next) => {
    const requestPayload = req.body;
    const findingUser = await User.findOne({ raw: true, where: { username: requestPayload.username } });
    if (_.isNil(findingUser)) {
      throw helper.createError(404, 'Username or password is incorrect');
    }
    const isPasswordMatch = await helper.isPasswordMatch(requestPayload.password, findingUser.password);
    if (!isPasswordMatch) {
      throw helper.createError(400, 'Username or password is incorrect');
    }
    return res.status(200).json({
      status: 'Success',
      value: helper.destruct(['password'], findingUser),
    });
  }),

  handleSignUp: catchAsync(async (req, res, next) => {
    const reqPayload = req.body;
    const existedUser = await User.findOne({ raw: true, where: { username: reqPayload.username } });
    if (!_.isNil(existedUser)) {
      throw helper.createError(400, 'Username was existed. Please select another username');
    }
    const newUser = await User.create(reqPayload);
    return res.status(201).json({
      status: 'Success',
      value: helper.destruct(['password'], newUser.dataValues),
    });
  }),
};
