'use strict';
require('dotenv').config();
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ranks', [
      {
        rankName: 'Gold 1', 
        rankLogoUrl: `${process.env.BACKEND_URL}/static/images/rank_1.png`
      },
      {
        rankName: 'Gold 2', 
        rankLogoUrl: `${process.env.BACKEND_URL}/static/images/rank_2.png`
      },
      {
        rankName: 'Gold 3', 
        rankLogoUrl: `${process.env.BACKEND_URL}/static/images/rank_3.png`
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ranks', ranks, {});
  },
};
