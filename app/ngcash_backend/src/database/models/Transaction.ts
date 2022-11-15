import { Model, INTEGER, DATE, DECIMAL } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  declare id: number;
  declare value: number;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
  updatedAt: false,
  underscored: true,
});

Transaction.belongsTo(Account);
Account.hasMany(Transaction);

export default Transaction;
