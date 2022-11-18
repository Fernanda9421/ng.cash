import { AccountService } from './account.service';
import { UserService } from './user.service';
import Transaction from '../database/models/Transaction';

const date = new Date();

export class TransactionService {
  private userService: UserService;
  private accountService: AccountService;

  constructor() {
    this.userService = new UserService();
    this.accountService = new AccountService();
  }

  public async createTransation(id:string, username:string, value:number):Promise<Transaction> {
    const usersTransactions = await this.userService.getUsersTransaction(id, username);

    const balanceCashOut = usersTransactions.cashOut.dataValues.account.dataValues.balance;
    const balanceCashIn = usersTransactions.cashIn.dataValues.account.dataValues.balance;
    const idCashIn = usersTransactions.cashIn.dataValues.id;

    await this.accountService.updateBalanceCashOut(balanceCashOut, value, Number(id));
    await this.accountService.updateBalanceCashIn(balanceCashIn, value, idCashIn);

    const dataForTransaction = {
      value,
      debitedAccountId: usersTransactions.cashOut.dataValues.accountId,
      creditedAccountId: usersTransactions.cashIn.dataValues.accountId,
      createdAt: date,
    };

    const transaction = await Transaction.create(dataForTransaction);

    return transaction;
  }
}
