import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { UserService } from '../services/user.service';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { username, password }: IUser = req.body;
      const newUser = await this.service.registerUser({ username, password }) as ILoggedUser;

      return res.status(201).json({ token: newUser.token });
    } catch (error) {
      next(error);
    }
  }
}
