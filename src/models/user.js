'use strict';
const helper = require('./../utils/helper');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsTo(models.role);
      this.hasMany(models.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.comment, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
      this.belongsTo(models.rank);
      this.belongsToMany(models.reaction, { through: models.postReaction });
      this.hasMany(models.bookmark, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          helper
            .hashPassword(value)
            .then((hash) => {
              this.setDataValue('password', hash);
            })
            .catch((err) => {
              console.error(err);
              throw err;
            });
        },
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      profilePhotoUrl: DataTypes.STRING,
      bio: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set() {
          return new Error(`Do not try to set the fullName value`);
        },
      },
      photoSource: {
        type: DataTypes.BLOB,
        defaultValue: null,
      },
      imgType: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      rankId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: false,
      hooks: {
        beforeCreate: async (instance) => {
          const endRole = await sequelize.model('role').findOne({ where: { roleName: 'End user' }, raw: true });
          instance.password = await helper.hashPassword(instance.password);
          instance.roleId = instance.roleId || endRole.id;
          return instance;
        },
      },
    },
  );
  return user;
};
