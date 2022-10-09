const _ = require('lodash');
module.exports = {
  constructResponseForGetStoredPost: (rawValues) => {
    const posts = _.map(rawValues.rows, (rawPost) => {
      const { post } = rawPost.toJSON();
      return {
        ...post,
        imageUrl: post.type === 'video' ? null : `${process.env.BACKEND_URL}/posts/media/${post.id}`,
        tags: _.map(post.tags, 'tagName'),
        categories: _.map(post.categories, 'categoryName'),
      };
    });
    return {
      bookmarkCount: posts.length,
      posts,
    };
  },
  constructResponseForGettingBookmarkDetails: (rawValues) => {
    const bookmarkCount = rawValues.length;
    const details = _.map(rawValues, (rawBookmarkData) => {
      const bookmark = rawBookmarkData.toJSON();
      return {
        bookmarkId: bookmark.id,
        userId: bookmark.userId,
      };
    });
    return {
      bookmarkCount,
      bookmarkDetails: details,
    };
  },
};
