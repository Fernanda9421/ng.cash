import { Model, INTEGER, DATEONLY, DECIMAL } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  declare id: number;
  declare value: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare createdAt: string;
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
    type: DATEONLY,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
  underscored: true,
});

Transaction.belongsTo(Account, { foreignKey: 'id', as: 'debited' });
Transaction.belongsTo(Account, { foreignKey: 'id', as: 'credited' });
Account.hasMany(Transaction, { foreignKey: 'id', as: 'accounts' });

export default Transaction;
