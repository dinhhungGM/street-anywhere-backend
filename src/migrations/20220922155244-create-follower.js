'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('followers', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('followers');
  },
};
