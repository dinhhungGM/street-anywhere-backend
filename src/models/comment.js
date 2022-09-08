'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.comment);
    }
  }
  comment.init(
    {
      content: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'comment',
    },
  );
  return comment;
};
