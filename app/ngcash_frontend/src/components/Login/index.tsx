import LoginImage from '../../images/login.png';
import styles from '@/styles/Form/heroForm.module.css';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import HeroForm from '../HeroForm';
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';
import { requestPost } from 'src/services/requests';
import { useRouter } from 'next/router';
import { storageSetItem } from 'src/utils/localStorage';
import { IUser } from './interfaces';
import { Exception } from '../../interfaces/error';

const Login = () => {
  const { setError } = useContext(AppContext);
  const route = useRouter();

  const onSubmit = async (data:IFormInputs) => {
    const endpoint = '/login';

    try {
      const { token, user }:IUser = await requestPost(endpoint, data);
      const { username, id } = user;
      setError('');
      storageSetItem('user', { token, username, id });
      route.push('/account');
    } catch (error) {
      const result = (error as Exception).response.data.message;
      setError(result);
    }
  };

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
