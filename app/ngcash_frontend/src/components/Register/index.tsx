import { FunctionComponent, useContext } from 'react';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import RegisterImage from '../../images/register.png';
import styles from '@/styles/Form/heroForm.module.css';
import HeroForm from '../HeroForm';
import { requestPost } from 'src/services/requests';
import { AppContext } from 'src/context/AppContext';
import { useRouter } from 'next/router';

const Register: FunctionComponent = () => {
  const { setError } = useContext(AppContext);
  const route = useRouter();
  const onSubmit = async (data:IFormInputs) => {
    const endpoint = '/register';

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
      <HeroForm image={RegisterImage} width={400} height={100} />
      <div className={styles.formContainer}>
        <Form onSubmit={onSubmit} content='Registrar' />
      </div>
    </div>
  );
};

export default Register;
