export function isValidCashOut(balance:string, value:number):boolean {
  return value < parseFloat(balance);
}
