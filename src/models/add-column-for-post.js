'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class add - column -
    for -post extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
  add - column -
    for -post.init({
      type: DataTypes.STRING,
      mediaSources: DataTypes.BLOB,
      size: DataTypes.FLOAT
    }, {
      sequelize,
      modelName: 'add-column-for-post',
    });
  return add - column -
    for -post;
};