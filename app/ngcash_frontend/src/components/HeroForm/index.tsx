import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Props } from './interfaces';
import styles from '@/styles/Form/heroForm.module.css';

const HeroForm: FunctionComponent<Props> = ({ image, width, height }) => {
  return (
    <div className={styles.image}>
      <div className={styles.presentation}>
        <h1 className={styles.title}>NG.CA$H</h1>
        <p className='mb-10'>A sua carteira digital</p>
        <Image
          src={image}
          alt='Wallet ilustration'
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default HeroForm;