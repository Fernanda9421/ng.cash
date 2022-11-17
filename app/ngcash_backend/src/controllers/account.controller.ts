import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/account.service';

export class AccountController {
  private service: AccountService;

  constructor() {
    this.service = new AccountService();
  }

  public async getBalanceById(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { id } = req.params;
      const account = await this.service.getBalanceById(Number(id));

      return res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
}
