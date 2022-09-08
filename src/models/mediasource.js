'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mediaSource extends Model {
    static associate(models) {
      this.belongsTo(models.media);
    }
  }
  mediaSource.init(
    {
      sources: DataTypes.BLOB,
      mediumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'mediaSource',
      timestamps: false,
    },
  );
  return mediaSource;
};
