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
  // onSubmit: () => { },
};

export const AppContext = createContext<authContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AppContext);
};
