'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'description', {
      type: Sequelize.TEXT,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
