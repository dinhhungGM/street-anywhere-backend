const _ = require('lodash');
module.exports = {
  toTitleCase: (text) => {
    return _.startCase(_.toLower(`${ text.trim() }`));
  },
  getFullName: (user) => {
    return _.startCase(_.toLower(`${ user.firstName.trim() } ${ user.lastName.trim() }`));
  },
};
