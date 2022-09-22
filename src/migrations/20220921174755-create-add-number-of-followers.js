'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'numberOfFollowers', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
