import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '../database/config/jwt.config';
import HttpException from '../exceptions/HttpException';

export function validateToken(req:Request, _res:Response, next:NextFunction):void {
  const { authorization: token } = req.headers;

  if (!token || token === '') throw new HttpException(401, 'Token not found');

  try {
    verify(token, secret);

    next();
  } catch (error) {
    console.log(error);
    throw new HttpException(401, 'Expired or invalid token');
  }
}
