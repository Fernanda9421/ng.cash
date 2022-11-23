import styles from '@/styles/SuccessTransfer/successTransfer.module.css';
import { useRouter } from 'next/router';
import { convertDate } from 'src/utils/convertData';
import { convertValue } from 'src/utils/convertValue';
import Button from '../Button';
import { ISuccess } from './interfaces';

const SuccessTransfer = ({ user, value, date, setIsTransactionSuccess }:ISuccess) => {
  const route = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Tranferência realizada com sucesso!</h1>
        <div className={styles.receipt}>
          <p className={styles.listItem}>Destinatário <span className={styles.result}>@{user}</span></p>
          <p className={styles.listItem}>Valor <span className={styles.result}>{`R$ ${convertValue(value)}`}</span></p>
          <p className={styles.listItem}>Data da transferência <span className={styles.result}>{convertDate(date)}</span></p>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} name='Nova transferência' onClick={ () => setIsTransactionSuccess(false) } />
          <Button className={styles.button} name='Página principal' onClick={ () => route.push('/account')} />
        </div>
      </div>
    </div>
  );
};

export default SuccessTransfer;