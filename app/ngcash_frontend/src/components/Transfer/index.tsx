import { FunctionComponent } from 'react';
import styles from '@/styles/Transfer/transfer.module.css';
import FormTransfer from './FormTransfer';

const Transfer: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.presentationContainer}>
        <h1 className={styles.title}>Área de transferência</h1>
      </div>
      <FormTransfer />
    </div>
  );
};

export default Transfer;