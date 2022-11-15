import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
  underscored: true,
});

export default Account;
