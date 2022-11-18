import { ILoggedUser } from '../interfaces/ILoggedUser';
import User from '../database/models/User';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/INewUser';
import { encryptPassword } from '../utils/encryptPassword';
import { tokenGenerate } from '../utils/tokenGenerate';
import { AccountService } from './account.service';
import Account from '../database/models/Account';
import { isValidAccount } from '../utils/validAccount';
import { IUsersTransaction } from '../interfaces/IUserTransaction';

export class UserService {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public async getByUsername(username:string):Promise<User | null> {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Account,
        },
      ],
    });

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

  public async getUserById(id:number):Promise<User | void> {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Account,
        },
      ],
    });

    if (!user) throw new HttpException(404, 'User not found');
    return user;
  }

  public async getUsersTransaction(idCashOut:string, usernameCashIn:string):Promise<IUsersTransaction> {
    const userCashOut = await this.getUserById(Number(idCashOut));
    const userCashIn = await this.getByUsername(usernameCashIn);

    if (!userCashOut || !userCashIn) throw new HttpException(400, 'Invalid username');

    const validAccount = isValidAccount(userCashIn.dataValues.id, userCashOut.dataValues.id);
    if (!validAccount) throw new HttpException(400, 'Invalid username');

    return {
      cashOut: userCashOut,
      cashIn: userCashIn,
    };
  }
}
