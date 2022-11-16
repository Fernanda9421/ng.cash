import jwt from 'jsonwebtoken';
import { secret, options } from '../database/config/jwt.config';

export function tokenGenerate(username:string, id:number):string {
  return jwt.sign({ username, id }, secret, options);
}
