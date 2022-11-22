import LoginImage from '../../images/login.png';
import styles from '@/styles/Form/heroForm.module.css';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import HeroForm from '../HeroForm';
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';
import { requestPost } from 'src/services/requests';
import { useRouter } from 'next/router';

const Login = () => {
  const { setError } = useContext(AppContext);
  const route = useRouter();

  const onSubmit = async (data:IFormInputs) => {
    const endpoint = '/login';

    try {
      await requestPost(endpoint, data);
      setError('');
      route.push('/account');
    } catch (error:any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
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
