'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postTag extends Model {
    static associate(models) {}
  }
  postTag.init(
    {
      postId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'postTag',
      timestamps: false,
    },
  );
  return postTag;
};
