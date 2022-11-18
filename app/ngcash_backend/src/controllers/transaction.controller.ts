import { Request, Response, NextFunction } from 'express';
import { IRequestTransaction } from '../interfaces/ITransaction';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  private service: TransactionService;

  constructor() {
    this.service = new TransactionService();
  }

  public async createTransaction(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { username, value }:IRequestTransaction = req.body;
      const { id } = req.params;
      const transaction = await this.service.createTransation(id, username, value);

      const result = {
        id: transaction.id,
        debitedAccountId: transaction.debitedAccountId,
        creditedAccountId: transaction.creditedAccountId,
        value: transaction.value,
        createdAt: transaction.createdAt,
      };

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionsById(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { id } = req.params;
      const transactions = await this.service.getTransactionsById(id);

      return res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
}
