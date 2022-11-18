import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Account from './Account';

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

User.belongsTo(Account, { foreignKey: 'id' });
Account.hasOne(User, { foreignKey: 'id' });

export default User;
