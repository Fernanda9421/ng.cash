import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Exception } from 'src/interfaces/error';
import { api, requestGet, setToken } from 'src/services/requests';
import { storageGetItem } from 'src/utils/localStorage';
import styles from '@/styles/Account/account.module.css';
import Link from 'next/link';
import Button from '../Button';

const Account = () => {
  const route = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    (async () => {
      const { token, id, username } = storageGetItem('user');
  
      if (!token) route.push('/');
      setToken(token);
      setUser(username);
  
      try {
        const account = await requestGet(`/account/${id}`);
        setIsAuthenticated(true);
        setBalance(account.balance);
      } catch (error) {
        const result = (error as Exception).response.data.message;
        console.log(result);
        setIsAuthenticated(false);
        route.push('/');
      }
    })(); 
  }, []);

  return (
    <div className={styles.presentationContainer}>
      {
        isAuthenticated && (
          <div className={styles.box}>
            <div className={styles.user}>
              <span className={styles.username}>@{user}</span>
              <span className={styles.welcome}>Boas-vindas</span>
            </div>
            <div className={styles.balance}>
              <span className='text-secondary mr-3'>Saldo atual:</span>
              <span>R${balance}</span>
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.button} name='Operações' onClick={() => route.push('/operations')} />
              <Button className={styles.button} name='Transferir' onClick={() => route.push('/transfer')} />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Account;
