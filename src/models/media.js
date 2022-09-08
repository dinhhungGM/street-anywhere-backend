'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    static associate(models) {
      this.belongsTo(models.post);
      this.hasOne(models.mediaSource, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    }
  }
  media.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      size: DataTypes.FLOAT,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'media',
      timestamps: false,
    },
  );
  return media;
};
