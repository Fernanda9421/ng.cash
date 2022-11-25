import { useContext } from 'react';
import styles from '../../styles/Transfer/transferStatus.module.css';
import { useRouter } from 'next/router';
import Button from '../Button';
import { AppContext } from '../../context/AppContext';
import { IError } from '../SuccessTransfer/interfaces';
import Image from 'next/image';
import ErrorImage from '../../images/error.png';

const ErrorTransfer = ({ setIsTransactionSuccess }:IError) => {
  const route = useRouter();
  const { error, setError } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Ops! Algo deu errado com sua transferência.</h1>
        <div className={styles.receipt}>
          <Image
            src={ErrorImage}
            alt='error'
            width={100}
            height={300}
          />
          {
            error === 'Invalid fields' ? (
              <p>O nome de usuário informado é inválido</p>
            ) : (
              <p>Parece que você não tem saldo suficiente para realizar essa transação :( </p>
            )
          }
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} name='Nova transferência' onClick={ () => { setError(''); setIsTransactionSuccess(false); } } />
          <Button className={styles.button} name='Página principal' onClick={ () => { setError(''); route.push('/account'); } }/>
        </div>
      </div>
    </div>
  );
};

export default ErrorTransfer;
