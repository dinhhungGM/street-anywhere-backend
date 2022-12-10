const moment = require('moment');

module.exports = {
  toLocaleString: (date) => {
    return new Date(date).toLocaleString();
  },
};
