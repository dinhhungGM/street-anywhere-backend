const _ = require('lodash');

module.exports = {
  constructResponseForGetReactionsByPostId: (rawData) => {
    let reactionDetailsResponse = {
      reactionCountAll: rawData.length,
      reactionDetails: {},
    };
    _.forEach(rawData, (rawPostReaction) => {
      const postReaction = rawPostReaction.toJSON();
      const {
        id,
        reaction: { reactionType },
        user,
      } = postReaction;
      const userInfo = {
        userId: user.id,
        fullName: user.fullName,
      };
      if (reactionDetailsResponse.reactionDetails[reactionType]) {
        reactionDetailsResponse.reactionDetails[reactionType].count++;
        reactionDetailsResponse.reactionDetails[reactionType].users.push({ ...userInfo, postReactionId: id });
      } else {
        const newField = {
          count: 1,
          users: [{ ...userInfo, postReactionId: id }],
        };
        reactionDetailsResponse.reactionDetails[reactionType] = newField;
      }
    });
    return reactionDetailsResponse;
  },
};
