'use strict';
const { roles } = require('./../json/roles.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
