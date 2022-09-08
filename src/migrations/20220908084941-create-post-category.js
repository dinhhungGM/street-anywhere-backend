'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postCategories');
  },
};
