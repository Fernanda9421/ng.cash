import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Button from '../Button';
import styles from '../../styles/Operation/operation.module.css';

const NoTransactions: FunctionComponent = () => {
  const route = useRouter();
  return (
    <div className='flex flex-col'>
      <p className={styles.noTransactions}>Ops! Essa conta ainda não possui transações.</p>
      <div className={styles.buttons}>
        <Button className={styles.button} name='Transferir' onClick={() => route.push('/transfer')} />
        <Button className={styles.button} name='Página principal' onClick={() => route.push('/account')} />
      </div>
    </div>
  );
};

export default NoTransactions;
