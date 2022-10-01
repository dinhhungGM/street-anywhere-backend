const catchAsync = require('../../utils/catchAsync');
const { post: Post, user: User, reaction: Reaction, postReaction: PostReaction } = require('./../../models');
const _ = require('lodash');
const helper = require('../../utils/helper');

module.exports = {
  addReaction: catchAsync(async (req, res, next) => {
    const { postId: postIdInParams } = req.params;
    const { postId, userId, reactionId } = req.body;
    if (postIdInParams !== postId) {
      throw helper.createError(400, 'Post ID in params and Post Id in body are not match');
    }
    const [checkPost, checkUser, checkReaction] = await Promise.all([
      Post.findByPk(+postId),
      User.findByPk(+userId),
      Reaction.findByPk(+reactionId),
    ]);
    if (_.isNil(checkPost) || _.isNil(checkUser) || _.isNil(checkReaction)) {
      let errorMessage;
      if (_.isNil(checkPost)) {
        errorMessage = 'The post which you wanna add reaction does not exist';
      } else if (_.isNil(checkUser)) {
        errorMessage = `The user does not exist`;
      } else {
        errorMessage = `The reaction does not exist`;
      }
      throw helper.createError(400, errorMessage);
    }
    await PostReaction.create(req.body);
    return res.status(201).json({
      status: 'Success',
      message: 'Add reaction successfully',
    });
  }),
  getAllReactionsByPostId: catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const allReactions = await PostReaction.findAndCountAll({
      where: {
        postId: +postId,
      },
      attributes: ['postId'],
      include: [
        {
          model: Reaction,
          attributes: ['reactionType'],
        },
        {
          model: User,
          attributes: ['id', 'fullName'],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: allReactions,
    });
  }),
};
