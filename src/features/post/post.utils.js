const _ = require('lodash');

module.exports = {
  constructResponseValueForGetPostByUserId: (rawValue) => {
    const { count, rows } = rawValue;
    const responsePosts = rows.map((rawPost) => {
      const post = rawPost.toJSON();
      const { reactions, bookmarks, comments, ...rest } = post;
      return {
        ...rest,
        imageUrl: post.type === 'video' ? null : `${ process.env.BACKEND_URL }/posts/media/${ post.id }`,
        tags: _.map(post.tags, 'tagName'),
        categories: _.map(post.categories, 'categoryName'),
        reactionCount: reactions.length,
        bookmarkCount: bookmarks.length,
        commentCount: comments.length,
      };
    });
    return responsePosts;
  },
  constructResponseValueForGetPostByPostId: (rawValue) => {
    const {
      dataValues: postDataValues,
      tags,
      categories,
      user: { dataValues: userInfo },
    } = rawValue;
    // Construct reaction detail
    let reactionDetails = {};
    const reactionsGroupObj = _.groupBy(postDataValues.reactions, 'reactionType'); // object, to group reaction
    for (const reactionType in reactionsGroupObj) {
      const details = reactionsGroupObj[reactionType]; // array, get a item of reaction
      const firstItem = details[0].toJSON(); // To get reaction id
      reactionDetails[reactionType] = {
        reactionId: firstItem.id,
        count: details.length,
        users: _.map(details, (item) => item.postReaction.userId),
      };
    }
    // Construct response payload
    const responseValue = {
      ...postDataValues,
      imageUrl: `${ process.env.BACKEND_URL }/posts/media/${ postDataValues.id }`,
      tags: _.map(tags, 'tagName'),
      categories: _.map(categories, 'categoryName'),
      user: {
        id: userInfo.id,
        fullName: _.startCase(_.toLower(`${ userInfo.firstName } ${ userInfo.lastName }`)),
        profilePhotoUrl: userInfo.profilePhotoUrl || `${ process.env.BACKEND_URL }/static/images/avatar.png`,
      },
      reactions: reactionDetails,
    };
    return responseValue;
  },
  getImageUrl: (post) => {
    return post.type === 'video' ? null : `${ process.env.BACKEND_URL }/posts/media/${ post.id }`;
  },
  getReactionDetails: (reactions) => {
    const groupData = _.groupBy(reactions, 'reactionType');
    const reactionDetails = [];
    for (const reaction in groupData) {
      const detail = groupData[reaction];
      reactionDetails.push({
        reactionType: reaction,
        total: detail.length,
        reactedUsers: _.map(detail, (item) => ({
          postReactionId: item.postReaction.id,
          userId: item.postReaction.userId,
        })),
      });
    }
    return reactionDetails;
  },
  isHasLocation: (post) => {
    return Boolean(post.location && post.longitude && post.latitude);
  },
  getBookmarkDetails: (bookmarks) => {
    return _.map(bookmarks, (item) => ({ bookmarkId: item.id, userId: item.userId }));
  },
};
