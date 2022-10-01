'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    static associate(models) {
      this.belongsToMany(models.post, { through: models.postReaction, onUpdate: 'CASCADE', onDelete: 'SET NULL' });
      this.hasMany(models.postReaction, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    }
  }
  reaction.init(
    {
      reactionType: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'reaction',
      timestamps: false,
    },
  );
  return reaction;
};
