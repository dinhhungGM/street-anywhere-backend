const models = require('./../../models');
const _ = require('lodash');
const helper = require('./../../utils/helper');
const catchAsync = require('./../../utils/catchAsync');

module.exports = {
  createNewNotification: catchAsync(async (req, res, next) => {
    const { type, userId, reactionType = null, postId } = req.body;
    const [user, post] = await [models.user.findByPk(+userId), models.post.findByPk(+postId)];
    if (_.isNil(user)) {
      throw helper.createError(404, 'Not found user');
    }
    if (_.isNil(post)) {
      throw helper.createError(404, 'Not found post');
    }
    const newNotification = await models.notifications.create({
      type,
      userId,
      postId,
      reactionType: type === 'commented' ? null : reactionType,
    });
    return res.status(201).json({
      status: 'Success',
      message: 'Create successfully',
      value: newNotification,
    });
  }),
  getNotifications: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await models.user.findByPk(+userId);
    if (_.isNil(user)) {
      throw helper.createError(404, 'Not found user');
    }
    const notifications = await models.notifications.findAndCountAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: models.user,
          attributes: ['firstName', 'lastName', 'fullName', 'profilePhotoUrl'],
        },
        {
          model: models.post,
          attributes: ['shortTitle'],
          where: {
            userId: +userId,
          },
        },
      ],
      order: [['createdAt', 'desc']],
    });
    const responseData = {
      count: notifications.count,
      unSeenCount: _.filter(notifications.rows, (notification) => !notification.isSeen).length,
      details: _.map(notifications.rows, (item) => {
        const { user, post, createdAt, ...rest } = item.toJSON();
        return {
          ...rest,
          ...user,
          ...post,
          shortTitle: _.startCase(_.lowerCase(post.shortTitle)),
          createdAt: new Date(createdAt).toLocaleString(),
        };
      }),
    };
    return res.status(200).json({
      status: 'Success',
      value: responseData,
    });
  }),
  updateStatus: catchAsync(async (req, res, next) => {
    const { notificationId } = req.params;
    const instance = await models.notifications.findByPk(+notificationId);
    if (_.isNil(instance)) {
      throw helper.createError(404, 'Not found your notification');
    }
    await instance.update({
      isSeen: true,
    });
    await instance.reload();
    return res.status(200).json({
      status: 'Success',
      message: 'Change status successfully',
      value: instance,
    });
  }),
};
