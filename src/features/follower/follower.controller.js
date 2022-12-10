const models = require('./../../models');
const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const _ = require('lodash');

module.exports = {
  addFollower: catchAsync(async (req, res, next) => {
    const { userId, followerId } = req.body;
    const [user, follower] = await Promise.all([models.user.findByPk(+userId), models.user.findByPk(+followerId)]);
    if (_.isNil(user)) {
      throw helper.createError(404, 'Not found user');
    }
    if (_.isNil(follower)) {
      throw helper.createError(404, 'Not found follower');
    }
    const newFollower = await models.follower.create({
      userId: +userId,
      followerId: +followerId,
    });
    return res.status(201).json({
      status: '201: Created',
      message: 'Follow user successfully',
      value: newFollower,
    });
  }),
  deleteFollower: catchAsync(async (req, res, next) => {
    const { userId, followerId } = req.body;
    const [user, follower] = await Promise.all([models.user.findByPk(+userId), models.user.findByPk(+followerId)]);
    if (_.isNil(user)) {
      throw helper.createError(404, 'Not found user');
    }
    if (_.isNil(follower)) {
      throw helper.createError(404, 'Not found follower');
    }
    const count = await models.follower.destroy({
      where: {
        userId: +userId,
        followerId: +followerId,
      },
    });
    if (!count) {
      throw helper.createError(400, 'Delete failed. Please check userId, followerId again!');
    }
    return res.status(204).send();
  }),
  getFollowerByFollowerId: catchAsync(async (req, res, next) => {
    const { followerId } = req.params;
    const user = await models.user.findByPk(+followerId);
    if (_.isNil(user)) {
      throw helper.createError(404, 'Not found user');
    }
    const [results] = await models.sequelize.query(
      `
      SELECT u.id, u."firstName", u."lastName", u."profilePhotoUrl" 
      FROM followers f JOIN users u ON f."userId" = u."id"
      WHERE f."followerId" = ${ followerId }
      `,
    );
    // Construct data
    let responseValues = _.map(results, (user) => ({
      userId: user.id,
      fullName: _.startCase(_.toLower(`${ user.firstName.trim() } ${ user.lastName.trim() }`)),
      profilePhotoUrl: user.profilePhotoUrl,
    }));
    // Remove duplicate
    responseValues = _.unionBy(responseValues, 'userId');
    return res.status(200).send({
      status: 'Success',
      value: responseValues,
    });
  }),
};
