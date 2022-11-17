import Account from '../database/models/Account';
import HttpException from '../exceptions/HttpException';

const INITIAL_BALANCE = '100,00';

export class AccountService {
  public async createAccount():Promise<Account> {
    const account = await Account.create({ balance: INITIAL_BALANCE });

    return account;
  }

  public async getBalanceById(accountId:number):Promise<Account | void> {
    const account = await Account.findOne({ where: { id: accountId } });

    if (!account) throw new HttpException(404, 'Account not found');
    return account;
  }
}
