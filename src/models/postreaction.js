'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postReaction extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.reaction);
    }
  }
  postReaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: DataTypes.INTEGER,
      reactionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'postReaction',
      timestamps: false,
    },
  );
  return postReaction;
};
