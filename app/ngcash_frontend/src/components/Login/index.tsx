import Image from 'next/image';
import LoginImage from '../../images/login.png';
import styles from '@/styles/Form/heroForm.module.css';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import HeroForm from '../HeroForm';

const Login = () => {
  const onSubmit = (data:IFormInputs) => console.log(data);

  return (
    <div className={styles.container}>
      <HeroForm image={LoginImage} width={350} height={250} />
      <div className={styles.formContainer}>
        <Form onSubmit={ onSubmit } content='Entrar' />
      </div>
    </div>
  );
};

export default Login;
