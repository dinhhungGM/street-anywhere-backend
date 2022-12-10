const catchAsync = require('../../utils/catchAsync');
const { post: Post, user: User, reaction: Reaction, postReaction: PostReaction } = require('./../../models');
const _ = require('lodash');
const helper = require('../../utils/helper');
const ReactionsUtils = require('./reaction.utils');
const errorUtils = require('./../../utils/error');
const reactionConstants = require('./reaction.constants');

module.exports = {
  addReaction: catchAsync(async (req, res, next) => {
    const { postId: postIdInParams } = req.params;
    const { postId, userId, reactionId } = req.body;
    if (postIdInParams !== postId) {
      throw errorUtils.createBadRequestError(reactionConstants.ERROR_NOT_MATCH_POST_ID);
    }
    const [checkPost, checkUser, checkReaction] = await Promise.all([
      Post.findByPk(+postId),
      User.findByPk(+userId),
      Reaction.findByPk(+reactionId),
    ]);
    if (_.isNil(checkPost) || _.isNil(checkUser) || _.isNil(checkReaction)) {
      let errorMessage;
      if (_.isNil(checkPost)) {
        errorMessage = reactionConstants.ERROR_NOT_FOUND_POST;
      } else if (_.isNil(checkUser)) {
        errorMessage = reactionConstants.ERROR_NOT_FOUND_USER;
      } else {
        errorMessage = reactionConstants.ERROR_NOT_FOUND_REACTION;
      }
      throw errorUtils.createBadRequestError(errorMessage);
    }
    const newReaction = await PostReaction.create(req.body);
    return res.status(201).json({
      status: reactionConstants.STATUS_200,
      message: reactionConstants.SUCCESS_ADD_REACTION_SUCCESSFULLY,
      value: newReaction,
    });
  }),

  getAllReactionsByPostId: catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const allReactions = await PostReaction.findAll({
      where: {
        postId: +postId,
      },
      attributes: ['id', 'postId'],
      include: [
        {
          model: Reaction,
          attributes: ['reactionType'],
        },
        {
          model: User,
          attributes: ['id', 'fullName', 'firstName', 'lastName'],
        },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      value: ReactionsUtils.constructResponseForGetReactionsByPostId(allReactions),
    });
  }),

  getReactions: catchAsync(async (req, res, next) => {
    const reactions = await Reaction.findAll({ raw: true });
    return res.status(200).json({
      status: 'Success',
      value: reactions,
    });
  }),

  updateReaction: catchAsync(async (req, res, next) => {
    const { postReactionId } = req.params;
    const { reactionId } = req.body;
    const [reactionInstance, postReactionInstance] = await Promise.all([
      Reaction.findByPk(+reactionId),
      PostReaction.findByPk(+postReactionId),
    ]);
    if (_.isNil(reactionInstance)) {
      throw helper.createError(404, 'Not found reaction type');
    }
    if (_.isNil(postReactionInstance)) {
      throw helper.createError(404, 'Not found your reaction of post');
    }
    postReactionInstance.set({ reactionId });
    await postReactionInstance.save();
    return res.status(200).json({
      status: 'Success',
      message: 'Update successfully',
      value: postReactionInstance,
    });
  }),

  deletePostReaction: catchAsync(async (req, res, next) => {
    const { postReactionId } = req.params;
    const deletedCount = await PostReaction.destroy({
      where: {
        id: +postReactionId,
      },
    });
    if (!deletedCount) {
      throw helper.createError(404, 'Not found your reaction of post');
    }
    return res.status(204).send();
  }),
};
