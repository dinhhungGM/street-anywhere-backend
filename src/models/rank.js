'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rank extends Model {
    static associate(models) {
      this.hasMany(models.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    }
  }
  rank.init(
    {
      rankName: DataTypes.STRING,
      rankLogoUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'rank',
      timestamps: false,
    },
  );
  return rank;
};
