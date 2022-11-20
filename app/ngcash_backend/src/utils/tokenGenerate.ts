import jwt from 'jsonwebtoken';
import { secret, options } from '../database/config/jwt.config';
import HttpException from '../exceptions/HttpException';

export function tokenGenerate(username:string, id:number):string {
  if (secret === '') throw new HttpException(400, 'The secret cannot be empty');
  return jwt.sign({ username, id }, secret, options);
}
