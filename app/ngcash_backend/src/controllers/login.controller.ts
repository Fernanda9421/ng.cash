import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/login.service';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';

export class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { username, password }: IUser = req.body;
      const user = await this.service.login({ username, password }) as ILoggedUser;

      return res.status(201).json({
        user: {
          id: user.newUser.id,
          username: user.newUser.username,
        },
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  }
}
