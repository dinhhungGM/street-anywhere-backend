'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('posts', 'shortTitle', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('posts', 'description', {
        type: Sequelize.STRING,
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
