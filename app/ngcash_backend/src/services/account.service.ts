import Account from '../database/models/Account';
import { newBalanceCashIn, newBalanceCashOut } from '../utils/newBalance';

const INITIAL_BALANCE = '100,00';

export class AccountService {
  public async createAccount():Promise<Account> {
    const account = await Account.create({ balance: INITIAL_BALANCE });

    return account;
  }

  public async getBalanceById(accountId:number):Promise<Account | null> {
    const account = await Account.findOne({ where: { id: accountId } });

    return account;
  }

  public async updateBalanceCashOut(balance:string, value:number, id:number):Promise<[affectedCount: number]> {
    const newValue = newBalanceCashOut(balance, value);

    const newBalance = await Account.update({
      balance: String(newValue) }, { where: { id },
    });

    return newBalance;
  }

  public async updateBalanceCashIn(balance:string, value:number, id:number):Promise<[affectedCount: number]> {
    const newValue = newBalanceCashIn(balance, value);

    const newBalance = await Account.update({
      balance: String(newValue) }, { where: { id },
    });

    return newBalance;
  }
}
