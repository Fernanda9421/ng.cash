import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { storageGetItem } from '../../utils/localStorage';
import styles from '../../styles/Operation/operation.module.css';
import { useRouter } from 'next/router';
import { setToken } from '../../services/requests';
import { AppContext } from '../../context/AppContext';
import ShowTransactions from '../Transactions/ShowTransactions';
import NoTransactions from '../Transactions/NoTransactions';
import { IUser } from './interfaces';
import { getAllTransactions } from '../../utils/getAllTransactions';

const Operation: FunctionComponent = () => {
  const [user, setUser] = useState({
    username: '',
    id: 0,
  } as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('debited');
  const route = useRouter();
  const { transactions, setTransactions, isFiltered, setIsFiltered } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const { token, id, username } = storageGetItem('user');
    
      if (!token) route.push('/');
      setToken(token);
      setUser({ id, username });
      await getAllTransactions({id, setIsAuthenticated, setTransactions, setIsFiltered, route});
    })();
  }, [route]);

  return (
    <div className={styles.operationContainer}>
      <div className={styles.presentationContainer}>
        <h1 className={styles.title}>Histórico de transações</h1>
        <p className='text-secondary'>@{user.username}</p>
      </div>
      <div>
        {
          isAuthenticated && transactions.length === 0 && isFiltered === false ? (
            <NoTransactions />
          ) : status === 'credited' ? (
            <ShowTransactions
              setStatus={setStatus}
              getAllTransactions={ () => getAllTransactions({id: user.id, setIsAuthenticated, setTransactions, setIsFiltered, route}) }
              id={ user.id }
              type='cashIn'
              transactions={ transactions }
              title='Enivados para você'
              head1='Remetente'
              status={status}
            />
          ) : (
            <ShowTransactions
              setStatus={setStatus}
              getAllTransactions={ () => getAllTransactions({id: user.id, setIsAuthenticated, setTransactions, setIsFiltered, route}) }
              id={ user.id }
              type='cashOut'
              transactions={transactions}
              title='Enviados por você'
              head1='Destinatário'
              status={status}
            />
          )
        }
      </div>
    </div>
  );
};

export default Operation;