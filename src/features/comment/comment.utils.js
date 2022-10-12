const _ = require('lodash');

module.exports = {
  buildResForGettingCommentByPostId: (rawComments) => {
    return _.map(rawComments, (rawComment) => {
      const comment = rawComment.toJSON();
      const createdAt = new Date(comment.createdAt);
      const updatedAt = new Date(comment.updatedAt);
      return {
        ...comment,
        user: {
          ...comment.user,
          profilePhotoUrl: comment.user.profilePhotoUrl || `${process.env.BACKEND_URL}/static/images/avatar.png`,
        },
        isUpdated: updatedAt.getTime() > createdAt.getTime(),
      };
    });
  },
};
