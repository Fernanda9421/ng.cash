import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/login.service';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import HttpException from '../exceptions/HttpException';

export class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { username, password }: IUser = req.body;
      const user = await this.service.login({ username, password }) as ILoggedUser;

      if (!user) throw new HttpException(401, 'Invalid fields');

      const result = {
        user: {
          id: user.newUser.id,
          username: user.newUser.username,
          accountId: user.newUser.accountId,
        },
        token: user.token,
      };

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
