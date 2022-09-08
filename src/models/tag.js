'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    static associate(models) {
      this.belongsToMany(models.post, { through: models.postTag, onUpdate: 'CASCADE', onDelete: 'SET NULL' });
    }
  }
  tag.init(
    {
      tagName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tag',
      timestamps: false,
    },
  );
  return tag;
};
