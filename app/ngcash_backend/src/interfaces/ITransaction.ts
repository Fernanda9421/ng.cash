import Transaction from '../database/models/Transaction';

export interface IRequestTransaction {
  username: string;
  value: number;
}

export interface ITransactions {
  cashOut: Transaction[],
  cashIn: Transaction[],
}
