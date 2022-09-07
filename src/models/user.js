'use strict';
const bcryptjs = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.role);
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
        beforeBulkCreate: async (users) => {
          for (const instance of users) {
            const hash = await bcryptjs.hash(instance.password, 10);
            instance.password = hash;
          }
          return users;
        },
        beforeCreate: async (instance) => {
          const hash = await bcryptjs.hash(instance.password, 10);
          instance.password = hash;
          return instance;
        },
      },
    },
  );
  return user;
};
