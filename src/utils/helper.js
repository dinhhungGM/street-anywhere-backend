const bcryptjs = require('bcryptjs');
const _ = require('lodash');

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  createError: (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  },
  hashPassword: async (password) => {
    try {
      const hash = await bcryptjs.hash(password + '', 10);
      return hash;
    } catch (error) {
      console.log('Error: Hash password');
      throw error;
    }
  },
  isPasswordMatch: async (password, hash) => {
    try {
      return await bcryptjs.compare(password, hash);
    } catch (error) {
      console.log('Error: Compare password');
      throw error;
    }
  },

  destruct: (exclusiveProps, obj) => {
    return _.omit(obj, exclusiveProps);
  },

  getInstanceId: (newInstance) => {
    return newInstance.dataValues.id;
  },

  extractValues: (values, mappingField) => {
    return _.map(values, mappingField);
  },

  calculateDistance: (p1, p2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(p2.y - p1.y); // deg2rad below
    var dLon = deg2rad(p2.x - p1.x);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(p1.y)) * Math.cos(deg2rad(p2.y)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  },
};
