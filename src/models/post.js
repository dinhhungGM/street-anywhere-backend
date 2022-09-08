'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.hasOne(models.media, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
      this.belongsToMany(models.tag, { through: models.postTag });
      this.belongsToMany(models.category, { through: models.postCategory });
      this.hasMany(models.comment, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    }
  }
  post.init(
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return post;
};
