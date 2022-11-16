import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Account extends Model {
  declare id: number;
  declare balance: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
  underscored: true,
});

export default Account;
