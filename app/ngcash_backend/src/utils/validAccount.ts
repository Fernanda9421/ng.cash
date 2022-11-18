export function isValidAccount(cashOutId:number, cashInId:number):boolean {
  return cashOutId !== cashInId;
}
