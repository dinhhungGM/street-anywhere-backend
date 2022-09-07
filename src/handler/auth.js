const { user: User } = require('./../models');
module.exports = {
  handleSignIn: async (req, res, next) => {
    try {
      const users = await User.findAll();
      return res.status(200).json({ data: users });
    } catch (error) {
      return next(error);
    }
  },
  handleSignUp: async (req, res, next) => {
    return res.status(201).end();
  },
};