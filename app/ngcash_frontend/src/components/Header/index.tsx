import Link from 'next/link';
import { FunctionComponent } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from '@/styles/Header/header.module.css';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>NG.CA$H</p>
      <Link href='/' className={styles.signOut}>
        Sair <FaSignOutAlt />
      </Link>
    </div>
  );
};

export default Header;
