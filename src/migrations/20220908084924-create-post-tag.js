'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postTags', {
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
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postTags');
  },
};
