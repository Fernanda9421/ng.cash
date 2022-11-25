import { FunctionComponent } from 'react';
import styles from '../../styles/Operation/operation.module.css';
import Button from '../Button';
import FiltersTransactions from '../FiltersTransactions';
import TransactionTable from '../TransactionTable';
import { PropsShowTransactions } from './interfaces';

const ShowTransactions:FunctionComponent<PropsShowTransactions> = ({
  setStatus, getAllTransactions, id, type, transactions, title, head1, status
}) => {
  return (
    <div>
      <div className={styles.buttons}>
        <Button className={styles.button} name='Enivados por você' onClick={() => { setStatus('debited'); getAllTransactions(id); }} />
        <Button className={styles.button} name='Enivados para você' onClick={() => { setStatus('credited'); getAllTransactions(id); }} />
      </div>
      <div className={styles.filter}>
        <FiltersTransactions type={type} />
        <Button className={styles.buttonTransaction} name='Todas as transações' onClick={() => getAllTransactions(id)} />
      </div>
      <TransactionTable
        transactions={transactions}
        title={title}
        head1={head1}
        head2='Valor'
        head3='Data da transação'
        type={status}
      />
    </div>
  );
};

export default ShowTransactions;