import { Dispatch, SetStateAction } from 'react';
import { ITransaction } from '../../Operation/interfaces';

export interface PropsShowTransactions {
  setStatus: Dispatch<SetStateAction<string>>;
  getAllTransactions: Function;
  id: number;
  type: string;
  transactions: ITransaction[] | [];
  title: string;
  head1: string;
  status: string;
};
