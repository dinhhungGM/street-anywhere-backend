'use strict';
const { tags } = require('./../json/tags.json');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
