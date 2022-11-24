import Header from '@/components/Header';
import Operation from '@/components/Operation';
import styles from '@/styles/Operation/operation.module.css';

const TransferMoney = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Operation />
    </div>
  );
};

export default TransferMoney;
