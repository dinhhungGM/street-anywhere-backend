'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  notifications.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      postId: DataTypes.INTEGER,
      isSeen: DataTypes.BOOLEAN,
      reactionType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'notifications',
    },
  );
  return notifications;
};
