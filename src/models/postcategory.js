'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postCategory extends Model {
    static associate(models) {}
  }
  postCategory.init(
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'postCategory',
      timestamps: false,
    },
  );
  return postCategory;
};
