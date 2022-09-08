'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasMany(models.user, { onUpdate: 'CASCADE', onDelete: 'SET NULL' });
    }
  }
  role.init(
    {
      roleName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'role',
      timestamps: false,
    },
  );
  return role;
};
