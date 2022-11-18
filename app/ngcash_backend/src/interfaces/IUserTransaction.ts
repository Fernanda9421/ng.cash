import User from '../database/models/User';

export interface IUsersTransaction {
  cashOut: User;
  cashIn: User;
}
