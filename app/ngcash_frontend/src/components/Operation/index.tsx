import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { storageGetItem } from '../../utils/localStorage';
import styles from '../../styles/Operation/operation.module.css';
import { useRouter } from 'next/router';
import { requestGet, setToken } from '../../services/requests';
import { Exception } from '../../interfaces/error';
import TransactionTable from '../TransactionTable';
import Button from '../Button';
import FiltersTransactions from '../FiltersTransactions';
import { AppContext } from '../../context/AppContext';

type IUser = {
  username: string,
  id: number,
}

const Operation: FunctionComponent = () => {
  const [user, setUser] = useState({
    username: '',
    id: 0,
  } as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('debited');
  const route = useRouter();
  const { transactions, setTransactions, isFiltered, setIsFiltered }:any = useContext(AppContext);

  const getAllTransactions = async (id:number) => {
    try {
      const transactions = await requestGet(`/transaction/${id}`);
      setIsAuthenticated(true);
      setTransactions(transactions);
      setIsFiltered(false);
    } catch (error) {
      const result = (error as Exception).response.data.message;
      setIsAuthenticated(false);
      route.push('/');
    }
  };

  useEffect(() => {
    (async () => {
      const { token, id, username } = storageGetItem('user');
    
      if (!token) route.push('/');
      setToken(token);
      setUser({ id, username });
      await getAllTransactions(id);
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
            <div className='flex flex-col'>
              <p className={styles.noTransactions}>Ops! Essa conta ainda não possui transações.</p>
              <div className={styles.buttons}>
                <Button className={styles.button} name='Transferir' onClick={ () =>  route.push('/transfer') } />
                <Button className={styles.button} name='Página principal' onClick={ () => route.push('/account')} />
              </div>
            </div>
          ) : status === 'credited' ? (
            <div>
              <div className={styles.buttons}>
                <Button className={styles.button} name='Enivados por você' onClick={() => { setStatus('debited'); getAllTransactions(user.id); } } />
                <Button className={styles.button} name='Enivados para você' onClick={() => { setStatus('credited'); getAllTransactions(user.id); } } />
              </div>
              <div className='flex my-8'>
                <FiltersTransactions type='cashIn' />
                <Button className={styles.buttonTransaction} name='Todas as transações' onClick={() => getAllTransactions(user.id) }/>
              </div>
              <TransactionTable
                transactions={ transactions }
                title='Enivados para você'
                head1='Remetente'
                head2='Valor'
                head3='Data da transação'
                type={status}
              />
            </div>
          ) : (
            <div>
              <div className={styles.buttons}>
                <Button className={styles.button} name='Enivados por você' onClick={() => { setStatus('debited'); getAllTransactions(user.id); } } />
                <Button className={styles.button} name='Enivados para você' onClick={() => { setStatus('credited'); getAllTransactions(user.id); } } />
              </div>
              <div className='flex my-6'>
                <FiltersTransactions type='cashOut' />
                <Button className={styles.buttonTransaction} name='Todas as transações' onClick={() => getAllTransactions(user.id) }/>
              </div>
              <TransactionTable
                transactions={ transactions }
                title='Enviados por você'
                head1='Destinatário'
                head2='Valor'
                head3='Data da transação'
                type={status}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Operation;