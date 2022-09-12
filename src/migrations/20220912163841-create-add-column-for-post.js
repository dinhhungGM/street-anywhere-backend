'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('posts', 'type', Sequelize.STRING),
      queryInterface.addColumn('posts', 'size', Sequelize.FLOAT),
      queryInterface.addColumn('posts', 'mediaSource', Sequelize.BLOB),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
