import { Op } from 'sequelize';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import Transaction from '../database/models/Transaction';
import Account from '../database/models/Account';
import User from '../database/models/User';

const date = new Date();

export class TransactionService {
  private userService: UserService;
  private accountService: AccountService;

  constructor() {
    this.userService = new UserService();
    this.accountService = new AccountService();
  }

  static querySearchTransaction(param: {}) {
    return {
      where: param,
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
    };
  }

  public async getTransactionsById(
    id:string, createdAt?:string, cashOut?:string, cashIn?:string,
  ):Promise<Transaction[]> {
    let filters = {};
    filters = {
      ...filters,
      [Op.or]: {
        creditedAccountId: Number(id),
        debitedAccountId: Number(id),
      },
    };

    if (createdAt) {
      filters = {
        ...filters,
        [Op.and]: [{ createdAt }],
      };

      if (cashOut) {
        filters = {
          ...filters,
          debitedAccountId: Number(id),
        };
      }

      if (cashIn) {
        filters = {
          ...filters,
          creditedAccountId: Number(id),
        };
      }
    }

    const transactions = await Transaction.findAll(TransactionService.querySearchTransaction(filters));

    return transactions;
  }

  public async createTransation(id:string, username:string, value:number):Promise<Transaction | null> {
    const usersTransactions = await this.userService.getUsersTransaction(id, username);

    if (!usersTransactions) return null;
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
