'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'videoYtbUrl', {
      type: Sequelize.STRING, 
      defaultValue: null
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};