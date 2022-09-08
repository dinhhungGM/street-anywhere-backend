'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      this.belongsToMany(models.post, { through: models.postCategory, onUpdate: 'CASCADE', onDelete: 'SET NULL' });
    }
  }
  category.init(
    {
      categoryName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'category',
      timestamps: false,
    },
  );
  return category;
};
