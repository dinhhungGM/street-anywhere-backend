'use strict';
const { reactions } = require('./../json/reactions.json');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reactions', reactions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reactions', null, {});
  },
};
