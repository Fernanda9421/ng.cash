import Account from '@/components/Account';
import Header from '@/components/Header';
import styles from '@/styles/Account/account.module.css';

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Account />
    </div>
  );
};

export default AccountPage;
