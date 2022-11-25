import { FunctionComponent, useContext } from 'react';
import Form from '../Form';
import { IFormInputs } from '../InputField/interfaces';
import RegisterImage from '../../images/register.png';
import styles from '../../styles/Form/heroForm.module.css';
import HeroForm from '../HeroForm';
import { requestPost } from '../../services/requests';
import { AppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { storageSetItem } from '../../utils/localStorage';
import { Exception } from '../../interfaces/error';
import { IUser } from '../Login/interfaces';

const Register: FunctionComponent = () => {
  const { setError, setInfoUser } = useContext(AppContext);
  const route = useRouter();
  const onSubmit = async (data:IFormInputs) => {
    const endpoint = '/register';

    try {
      const { token, user }:IUser = await requestPost(endpoint, data);
      const { username, id } = user;
      setError('');
      storageSetItem('user', { token, username, id });
      setInfoUser({ username: '', password: '' });
      route.push('/account');
    } catch (error) {
      const result = (error as Exception).response.data.message;
      setError(result);
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
