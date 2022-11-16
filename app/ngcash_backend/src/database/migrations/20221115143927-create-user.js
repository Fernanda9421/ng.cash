'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id',
        },
        field: 'account_id',
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
