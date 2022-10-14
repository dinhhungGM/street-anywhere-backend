const { Op } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const helper = require('../../utils/helper');
const models = require('./../../models');
const adminUtils = require('./admin.utils');

module.exports = {
  checkIsAdmin: catchAsync(async (req, res, next) => {
    const { adminUserId } = req.query;
    let currentUser = await models.user.findByPk(+adminUserId, {
      include: [
        {
          model: models.role,
        },
      ],
    });
    if (!currentUser) {
      throw helper.createError(404, 'The current user does not exist so we can not process your request');
    }
    currentUser = currentUser.toJSON();
    if (currentUser.role.roleName !== 'Administrator') {
      throw helper.createError(403, 'Request is denied because of your role');
    }
    return next();
  }),
  getAllUsers: catchAsync(async (req, res, next) => {
    const { adminUserId } = req.query;
    const allUsers = await models.user.findAll({
      where: {
        id: {
          [Op.ne]: +adminUserId,
        },
      },
      attributes: {
        exclude: ['password', 'photoSource', 'imgType', 'roleId'],
      },
      order: [['id', 'DESC']],
      include: [
        {
          model: models.role,
        },
        {
          model: models.post,
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: adminUtils.buildAllUsersResponse(allUsers),
    });
  }),
  deleteUser: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const count = await models.user.destroy({
      where: {
        id: +userId,
      },
    });
    if (!count) {
      throw helper.createError(404, 'Not found user to continue');
    }
    return res.status(204).send();
  }),
};
