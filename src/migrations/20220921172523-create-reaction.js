'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reactionType: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reactions');
  }
};