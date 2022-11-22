import { FunctionComponent } from 'react';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import RegisterImage from '../../images/register.png';
import styles from '@/styles/Form/heroForm.module.css';
import HeroForm from '../HeroForm';

const Register: FunctionComponent = () => {
  const onSubmit = (data:IFormInputs) => console.log(data);

  return (
    <div className={styles.container}>
      <HeroForm image={RegisterImage} width={400} height={100} />
      <div className={styles.formContainer}>
        <Form onSubmit={onSubmit} content='Registrar' />
      </div>
    </div>
  );
};

export default Register;
