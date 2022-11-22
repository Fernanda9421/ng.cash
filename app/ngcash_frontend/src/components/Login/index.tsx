import Image from 'next/image';
import LoginImage from '../../images/login.png';
import FormLogin from './FormLogin';
import styles from '@/styles/Login/login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.presentation}>
          <h1 className={styles.title}>NG.CA$H</h1>
          <p className='mb-10'>A sua carteira digital</p>
          <Image
            src={LoginImage}
            alt='Wallet ilustration'
            width={350}
            height={250}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
