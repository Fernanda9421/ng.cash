import User from '../database/models/User';

export interface ILoggedUser {
  newUser: User,
  token: string,
}
