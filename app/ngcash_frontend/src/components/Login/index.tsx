import Image from 'next/image';
import LoginImage from '../../images/login.png';
import FormLogin from './FormLogin';
import styles from '@/styles/Login/login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormLogin />
      </div>
      <div className={styles.image}>
        <Image
          src={LoginImage}
          alt='Wallet ilustration'
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Login;
