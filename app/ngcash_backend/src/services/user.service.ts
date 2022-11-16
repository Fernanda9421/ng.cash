import { ILoggedUser } from '../interfaces/ILoggedUser';
import User from '../database/models/User';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/INewUser';
import { encryptPassword } from '../utils/encryptPassword';
import { tokenGenerate } from '../utils/tokenGenerate';
import { AccountService } from './account.service';

export class UserService {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public async getByUsername(username:string):Promise<User | null> {
    const user = await User.findOne({ where: { username } });

    if (!user) return null;
    return user;
  }

  public async registerUser(user:IUser):Promise<ILoggedUser | void> {
    const userExists = await this.getByUsername(user.username);

    if (userExists) throw new HttpException(400, 'User already exists');

    const newAccount = await this.accountService.createAccount();
    const newUser = await User.create({
      username: user.username,
      password: encryptPassword(user.password),
      accountId: newAccount.dataValues.id,
    });
    const token = tokenGenerate(newUser.username, newUser.id);

    return {
      newUser,
      token,
    };
  }
}
