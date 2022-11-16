import md5 = require('md5');
import User from '../database/models/User';
import * as AccountService from './account.service';
import { ILogin } from '../interfaces/IRegisterUser';

const MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  USER_EXISTS: 'User already exists',
};

export async function getByUsername(username:string) {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return { status: 404, error: { message: MESSAGES.USER_NOT_FOUND } };
  }
  return { status: 200, user };
}

export async function registerUser(user:ILogin) {
  const userExists = await getByUsername(user.username);

  if (userExists.user) {
    return { status: 400, error: { message: MESSAGES.USER_EXISTS } };
  }

  const newAccount = await AccountService.createAccount();
  const newUser = await User.create({
    username: user.username,
    password: md5(user.password),
    accountId: newAccount.account.dataValues.id,
  });

  return { status: 200, newUser };
}
