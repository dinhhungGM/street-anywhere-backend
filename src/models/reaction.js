'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.post, { through: models.postReaction, onUpdate: 'CASCADE', onDelete: 'SET NULL' });
    }
  }
  reaction.init(
    {
      reactionType: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'reaction',
      timestamps: false,
    },
  );
  return reaction;
};
