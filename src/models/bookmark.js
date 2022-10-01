'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmark extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  bookmark.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'bookmark',
      timestamps: false,
    },
  );
  return bookmark;
};
