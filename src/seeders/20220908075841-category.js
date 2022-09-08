'use strict';
const { categories } = require('./../json/categories.json');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
