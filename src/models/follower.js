'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.user);
    }
  }
  follower.init(
    {
      userId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'follower',
      timestamps: false,
    },
  );
  follower.removeAttribute('id');
  return follower;
};
