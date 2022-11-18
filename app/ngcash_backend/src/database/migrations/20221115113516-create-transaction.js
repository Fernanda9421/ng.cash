'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        field: "created_at"
      },
      debitedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'accounts',
          key: 'id',
        },
        field: 'debited_account_id',
      },
      creditedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'accounts',
          key: 'id',
        },
        field: 'credited_account_id',
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('transactions');
  }
};
