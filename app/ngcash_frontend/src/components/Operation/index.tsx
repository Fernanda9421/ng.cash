import { FunctionComponent, useEffect, useState } from 'react';
import { storageGetItem } from 'src/utils/localStorage';
import styles from '@/styles/Operation/operation.module.css';
import { useRouter } from 'next/router';
import { requestGet, setToken } from 'src/services/requests';
import { Exception } from 'src/interfaces/error';
import TransactionTable from '../TransactionTable';
import Button from '../Button';
import { ITransaction } from './interfaces';

const Operation: FunctionComponent = () => {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transaction, setTransactions] = useState([] as ITransaction[] | []);
  const [status, setStatus] = useState('debited');
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const { token, id, username } = storageGetItem('user');
  
      if (!token) route.push('/');
      setToken(token);
      setUser(username);
  
      try {
        const transactions = await requestGet(`/transaction/${id}`);
        setIsAuthenticated(true);
        setTransactions(transactions);
        
      } catch (error) {
        const result = (error as Exception).response.data.message;
        setIsAuthenticated(false);
        route.push('/');
      }
    })(); 
  }, [route]);

  return (
    <div className={styles.operationContainer}>
      <div className={styles.presentationContainer}>
        <h1 className={styles.title}>Histórico de transações</h1>
        <p className='text-secondary'>@{user}</p>
      </div>
      <div>
        {
          isAuthenticated && transaction.length === 0 ? (
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
                <Button className={styles.button} name='Enivados para você' onClick={() => setStatus('credited')} />
                <Button className={styles.button} name='Enivados por você' onClick={() => setStatus('debited')} />
              </div>
              <TransactionTable
                transactions={ transaction }
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
                <Button className={styles.button} name='Enivados para você' onClick={() => setStatus('credited')} />
                <Button className={styles.button} name='Enivados por você' onClick={() => setStatus('debited')} />
              </div>
              <TransactionTable
                transactions={ transaction }
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