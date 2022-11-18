import HttpException from '../exceptions/HttpException';
import { isValidCashOut } from './validCashOut';

export function newBalanceCashOut(balance:string, value:number):string | void {
  const validCashOut = isValidCashOut(balance, value);
  if (!validCashOut) throw new HttpException(400, 'Invalid balance');

  return (parseFloat(balance) - value).toFixed(2);
}

export function newBalanceCashIn(balance:string, value:number):string | void {
  return (parseFloat(balance) + value).toFixed(2);
}
