import { ILoggedUser } from '../interfaces/ILoggedUser';
import User from '../database/models/User';
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
      include: [{ model: Account }],
    });

    return user;
  }

  public async registerUser(user:IUser):Promise<ILoggedUser | void> {
    const userExists = await this.getByUsername(user.username);

    if (!userExists) {
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

  public async getUserById(id:number):Promise<User | null> {
    const user = await User.findByPk(id, {
      include: [{ model: Account }],
    });

    return user;
  }

  public async getUsersTransaction(idCashOut:string, usernameCashIn:string):Promise<IUsersTransaction | null> {
    const userCashOut = await this.getUserById(Number(idCashOut));
    const userCashIn = await this.getByUsername(usernameCashIn);

    if (!userCashOut || !userCashIn) return null;

    const validAccount = isValidAccount(userCashIn.dataValues.id, userCashOut.dataValues.id);
    if (!validAccount) return null;

    return {
      cashOut: userCashOut,
      cashIn: userCashIn,
    };
  }
}
