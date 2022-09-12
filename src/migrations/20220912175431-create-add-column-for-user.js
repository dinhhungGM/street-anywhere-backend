'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('users', 'photoSource', Sequelize.BLOB),
      queryInterface.addColumn('users', 'imgType', Sequelize.STRING),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('add-column-for-users');
  },
};
