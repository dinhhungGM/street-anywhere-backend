'use strict';
const { users } = require('./../json/users.json');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
