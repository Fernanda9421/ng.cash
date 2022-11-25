import { createContext, useContext } from 'react';
import { authContextType } from './interfaces';

const authContextDefaultValues:authContextType = {
  infoUser: {
    username: '',
    password: '',
  },
  setInfoUser: () => { },
  onChange: () => { },
  error: '',
  setError: () => { },
  dataCashIn: {
    username: '',
    value: 0,
  },
  setDataCashIn: () => { },
  isFiltered: false,
  setIsFiltered: () => { },
  transactions: [],
  setTransactions: () => { },
};

export const AppContext = createContext<authContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AppContext);
};
