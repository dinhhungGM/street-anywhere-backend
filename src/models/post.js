'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsToMany(models.tag, { through: models.postTag });
      this.belongsToMany(models.category, { through: models.postCategory });
      this.hasMany(models.comment, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
      this.belongsToMany(models.reaction, { through: models.postReaction });
    }
  }
  post.init(
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      size: DataTypes.FLOAT,
      mediaSource: DataTypes.BLOB,
      shortTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      videoYtbUrl: DataTypes.STRING, 
      numberOfFollowers: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return post;
};
