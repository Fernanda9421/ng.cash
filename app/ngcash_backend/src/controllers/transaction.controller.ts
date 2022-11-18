import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
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
      if (!transaction) throw new HttpException(400, 'Invalid fields');

      return res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionsById(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { id } = req.params;
      const { createdAt, cashOut, cashIn } = req.query;

      if (createdAt && typeof createdAt !== 'string') {
        throw new HttpException(400, 'Query param has to be of type string');
      }
      if (cashOut && typeof cashOut !== 'string') {
        throw new HttpException(400, 'Query param has to be of type string');
      }
      if (cashIn && typeof cashIn !== 'string') {
        throw new HttpException(400, 'Query param has to be of type string');
      }
      const transactions = await this.service.getTransactionsById(id, createdAt, cashOut, cashIn);

      if (transactions.length === 0) throw new HttpException(400, 'User no transactions');

      return res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
}
