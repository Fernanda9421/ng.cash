import { Op } from 'sequelize';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import Transaction from '../database/models/Transaction';
import HttpException from '../exceptions/HttpException';
import Account from '../database/models/Account';
import User from '../database/models/User';
import { ITransactions } from '../interfaces/ITransaction';

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

  public async getTransactionsById(id:string):Promise<ITransactions> {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: {
          creditedAccountId: Number(id),
          debitedAccountId: Number(id),
        },
      },
      include: [
        { model: Account,
          as: 'creditedAccount',
          attributes: { exclude: ['balance'] },
          include: [
            {
              model: User,
              attributes: { exclude: ['id', 'password', 'accountId'] },
            },
          ],
        },
        {
          model: Account,
          as: 'debitedAccount',
          attributes: { exclude: ['balance'] },
          include: [
            {
              model: User,
              attributes: { exclude: ['id', 'password', 'accountId'] },
            },
          ],
        },
      ],
    });

    if (!transactions) throw new HttpException(400, 'User no transactions');

    return {
      cashIn:
        transactions.filter((transaction) => transaction.creditedAccountId === Number(id)),
      cashOut:
        transactions.filter((transaction) => transaction.debitedAccountId === Number(id)),
    };
  }
}
