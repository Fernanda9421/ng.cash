import { FunctionComponent, useEffect, useState } from 'react';
import { storageGetItem } from '../../utils/localStorage';
import styles from '../../styles/TransactionTable/transactionTable.module.css';
import { convertValue } from '../../utils/convertValue';
import { convertDate } from '../../utils/convertData';
import { ITableTransaction, ITransaction } from '../Operation/interfaces';

const TransactionTable: FunctionComponent<ITableTransaction> = (
  {transactions, title, head1, head2, head3, type}
) => {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const { id } = storageGetItem('user');
    setUserId(id);
  }, []);

  const credited = () => {
    return transactions.filter((transaction:ITransaction) => transaction.creditedAccountId === userId);
  };

  const debited = () => {
    return transactions.filter((transaction:ITransaction) => transaction.debitedAccountId === userId);
  };

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>{title}</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>{head1}</th>
            <th className={styles.th}>{head2}</th>
            <th className={styles.th}>{head3}</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {
            type === 'credited' ? (
              credited().map((transaction:ITransaction) => (
                <tr className={styles.tr} key={transaction.id }>
                  <td className={styles.td}>{`@${transaction.debitedAccount.user.username}`}</td>
                  <td className={styles.td}>{`R$${convertValue(transaction.value)}`}</td>
                  <td className={styles.td}>{convertDate(transaction.createdAt)}</td>
                </tr>
              ))
            ) : (
              debited().map((transaction:ITransaction) => (
                <tr className={styles.tr} key={transaction.id}>
                  <td className={styles.td}>{`@${transaction.creditedAccount.user.username}`}</td>
                  <td className={styles.td}>{`R$${convertValue(transaction.value)}`}</td>
                  <td className={styles.td}>{convertDate(transaction.createdAt)}</td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;