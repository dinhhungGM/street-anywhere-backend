'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('users', 'coverImageUrl', Sequelize.STRING),
      queryInterface.addColumn('users', 'coverImageSrc', Sequelize.BLOB),
      queryInterface.addColumn('users', 'description', Sequelize.TEXT),
      queryInterface.addColumn('users', 'phone', Sequelize.STRING),
      queryInterface.addColumn('users', 'email', Sequelize.STRING),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
