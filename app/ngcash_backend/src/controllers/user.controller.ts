import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { UserService } from '../services/user.service';
import HttpException from '../exceptions/HttpException';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { username, password }: IUser = req.body;
      const user = await this.service.registerUser({ username, password }) as ILoggedUser;

      if (!user) throw new HttpException(400, 'User already exists');
      const response = {
        user: {
          username: user.newUser.username,
          id: user.newUser.id,
        },
        token: user.token,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
