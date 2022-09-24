'use strict';
const { ranks } = require('./../json/ranks.json');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ranks', ranks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ranks', ranks, {});
  },
};
