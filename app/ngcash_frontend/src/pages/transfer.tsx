import Header from '../components/Header';
import Transfer from '../components/Transfer';
import styles from '../styles/Transfer/transfer.module.css';

const TransferMoney = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Transfer />
    </div>
  );
};

export default TransferMoney;
