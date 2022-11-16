import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { ILogin } from '../interfaces/IRegisterUser';
import * as userService from '../services/user.service';

export async function create(req:Request, res:Response, next:NextFunction) {
  try {
    const user = req.body as ILogin;
    const { status, newUser, error } = await userService.registerUser(user);

    return error
      ? res.status(status).json({ error })
      : res.status(status).json(newUser);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, 'Internal server error!'));
  }
}
