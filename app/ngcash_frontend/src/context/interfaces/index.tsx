import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface Props {
  children: ReactNode,
};

export interface Target {
  name: string,
  value: string,
};

export interface ComponentState {
  username: string,
  password: string,
};

export interface IDataCashIn {
  username: string,
  value: number,
};

export interface ITransaction {
  id: number;
  value: number;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: string;
  creditedAccount: {
    id: number;
    user: {
      username: string
    }
  };
  debitedAccount: {
    id: number;
    user: {
      username: string;
    }
  };
};

export interface authContextType {
  infoUser: ComponentState,
  setInfoUser: Dispatch<SetStateAction<ComponentState>>,
  onChange: (event: { target: Target },
    state: ComponentState | IDataCashIn,
    setState: Dispatch<SetStateAction<ComponentState>> | Dispatch<SetStateAction<IDataCashIn>>
  ) => void,
  error: string,
  setError: Dispatch<SetStateAction<string>>,
  dataCashIn: IDataCashIn,
  setDataCashIn: Dispatch<SetStateAction<IDataCashIn>>,
  isFiltered: boolean,
  setIsFiltered: Dispatch<SetStateAction<boolean>>,
  transactions: ITransaction[] | [],
  setTransactions: Dispatch<SetStateAction<ITransaction[] | []>>
};
