import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IType } from '../../components/FiltersTransactions/interfaces';
import { ITransaction } from '../../components/Operation/interfaces';

export interface PropsAllTransactions {
  id: number;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setTransactions: Dispatch<SetStateAction<ITransaction[] | []>>;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
  route: NextRouter;
};

export interface PropsTransactionsByDate {
  id: number;
  dateSelected: Date;
  setTransactions: Dispatch<SetStateAction<ITransaction[] | []>>;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
  type: string;
};
