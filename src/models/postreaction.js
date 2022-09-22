'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postReaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  postReaction.init({
    postId: DataTypes.INTEGER,
    reactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postReaction',
    timestamps: false
  });
  return postReaction;
};