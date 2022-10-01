'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('postReactions', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postReactions');
  },
};
