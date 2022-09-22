'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'rankId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ranks',
        key: 'id',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
