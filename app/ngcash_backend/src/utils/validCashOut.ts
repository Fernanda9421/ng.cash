export function isValidCashOut(balance:string, value:number):boolean {
  return value > 0 && value < parseFloat(balance);
}
