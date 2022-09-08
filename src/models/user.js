'use strict';
const helper = require('./../utils/helper');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsTo(models.role);
      this.hasMany(models.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      profilePhotoUrl: DataTypes.STRING,
      bio: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: false,
      hooks: {
        beforeCreate: async (instance) => {
          const endRole = await sequelize.model('role').findOne({ where: { roleName: 'End user' }, raw: true });
          instance.password = await helper.hashPassword(instance.password);
          instance.roleId = endRole.id;
          return instance;
        },
      },
    },
  );
  return user;
};
