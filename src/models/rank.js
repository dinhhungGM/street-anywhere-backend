'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    }
  }
  rank.init(
    {
      rankName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'rank',
    },
  );
  return rank;
};
