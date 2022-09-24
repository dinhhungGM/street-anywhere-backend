'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('posts', 'numberOfFollowers'),
      queryInterface.addColumn('posts', 'views', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
