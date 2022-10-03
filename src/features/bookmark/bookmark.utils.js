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
};
