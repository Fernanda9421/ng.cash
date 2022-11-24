import { FunctionComponent, useEffect, useState } from 'react';
import styles from '@/styles/Transfer/transfer.module.css';
import FormTransfer from './FormTransfer';
import { storageGetItem } from 'src/utils/localStorage';

const Transfer: FunctionComponent = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const { username } = storageGetItem('user');
    setUser(username);
  }, []);

  return (
    <div className={styles.transferContainer}>
      <div className={styles.presentationContainer}>
        <h1 className={styles.title}>Área de transferência</h1>
        <p className='text-secondary'>@{user}</p>
      </div>
      <FormTransfer />
    </div>
  );
};

export default Transfer;