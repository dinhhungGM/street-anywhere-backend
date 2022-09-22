'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postReactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'posts', 
          key: 'id'
        }
      },
      reactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reactions',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postReactions');
  }
};