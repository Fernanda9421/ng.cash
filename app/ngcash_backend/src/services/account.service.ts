import Account from '../database/models/Account';

const INITIAL_BALANCE = '100,00';

export class AccountService {
  public async createAccount():Promise<Account> {
    const account = await Account.create({ balance: INITIAL_BALANCE });

    return account;
  }
}
