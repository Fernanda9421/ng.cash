import { FunctionComponent, useState, ComponentState, Dispatch, SetStateAction } from 'react';
import { ITransaction } from '../components/Operation/interfaces';
import { AppContext } from './AppContext';
import { IDataCashIn, Props, Target } from './interfaces';

const AppProvider: FunctionComponent<Props> = ({ children }) => {
  const [infoUser, setInfoUser] = useState({
    username: '',
    password: '',
  });

  const [dataCashIn, setDataCashIn] = useState({
    username: '',
    value: 0.01,
  });

  const [error, setError] = useState('');

  const [isFiltered, setIsFiltered] = useState(false);

  const [transactions, setTransactions] = useState([] as ITransaction[] | []);

  const onChange = (
    event: { target: Target },
    state: ComponentState | IDataCashIn,
    setState: Dispatch<SetStateAction<ComponentState>> | Dispatch<SetStateAction<IDataCashIn>>
  ) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    } as ComponentState | IDataCashIn);
  };

  const context = {
    infoUser,
    setInfoUser,
    onChange,
    error,
    setError,
    dataCashIn,
    setDataCashIn,
    transactions,
    setTransactions,
    isFiltered,
    setIsFiltered,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;
