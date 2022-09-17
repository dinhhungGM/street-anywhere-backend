const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { user: User } = require('./../models');

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
};
