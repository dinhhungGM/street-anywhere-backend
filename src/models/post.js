'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      this.hasOne(models.media, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
      this.belongsTo(models.user);
      this.belongsToMany(models.postTag, { through: 'postTags' });
      this.belongsToMany(models.category, { through: 'postCategories' });
    }
  }
  post.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      mediaId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return post;
};
