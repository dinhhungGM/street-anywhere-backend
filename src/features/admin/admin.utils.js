const _ = require('lodash');
module.exports = {
  buildAllUsersResponse: (rawValues) => {
    return _.map(rawValues, (rawValue) => {
      const instance = rawValue.toJSON();
      const { posts, role, ...restInfo } = instance;
      return {
        ...restInfo,
        role: role.roleName, 
        isAdmin: role.roleName === 'Administrator',
        postCount: posts.length,
      };
    });
  },
};
