import styles from '../../styles/Transfer/transferStatus.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { convertDate } from '../../utils/convertData';
import { convertValue } from '../../utils/convertValue';
import Button from '../Button';
import { ISuccess } from './interfaces';
import Success from '../../images/success.png';
import { FunctionComponent } from 'react';

const SuccessTransfer:FunctionComponent<ISuccess> = ({ user, value, date, setIsTransactionSuccess }) => {
  const route = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Tranferência realizada com sucesso!</h1>
        <div className={styles.receipt}>
          <div className={styles.image}>
            <Image
              src={Success}
              alt='success'
              width={100}
              height={300}
            />
          </div>
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