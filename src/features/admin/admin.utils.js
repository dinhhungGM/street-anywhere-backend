const _ = require('lodash');
module.exports = {
  buildAllUsersResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const instance = rawValue.toJSON();
      const { posts, role, rank, ...restInfo } = instance;
      return {
        ...restInfo,
        role: role.roleName,
        isAdmin: role.roleName === 'Administrator',
        postCount: posts.length,
        ...rank,
      };
    });
  },
  buildAllReactionResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const reactionInstance = rawValue.toJSON();
      const { postReactions, ...restInfo } = reactionInstance;
      return {
        ...restInfo,
        numberOfUses: postReactions.length,
      };
    });
  },
  buildAllCategoriesResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const categoryInstance = rawValue.toJSON();
      const { postCategories, ...restInfo } = categoryInstance;
      return {
        ...restInfo,
        numberOfUses: postCategories.length,
      };
    });
  },
  buildAllHashTagsResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const tagsInstance = rawValue.toJSON();
      const { postTags, ...restInfo } = tagsInstance;
      return {
        ...restInfo,
        numberOfUses: postTags.length,
      };
    });
  },
  buildAllRolesResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const roleInstance = rawValue.toJSON();
      const { users, ...restInfo } = roleInstance;
      return {
        ...restInfo,
        users,
        numberOfUsers: users.length,
      };
    });
  },
};
