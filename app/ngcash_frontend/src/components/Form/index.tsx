import { FunctionComponent, useContext } from 'react';
import styles from '@/styles/Form/form.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import Button from '../Button';
import { IFormInputs } from '../InputField/interfaces';
import { userSchema } from 'src/schemas/userSchema';
import { AppContext } from 'src/context/AppContext';
import { FaRegEnvelope, FaLock } from 'react-icons/fa';
import { Props } from './interfaces';
import { useRouter } from 'next/router';

const Form: FunctionComponent<Props> = ({ onSubmit, content }) => {
  const { onChange, infoUser, setInfoUser } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(userSchema),
  });

  const router = useRouter();

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.presentation}>
        <h1 className={styles.title}>NG.CA$H</h1>
        <p className={styles.subtitle}>A sua carteira digital</p>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <FaRegEnvelope className={styles.icon} />
          <InputField
            name='username'
            type='text'
            value= { infoUser.username }
            placeholder='Username'
            register={ register }
            className={styles.inputField}
            onChange={ (event) => onChange(event, infoUser, setInfoUser )}
          />
        </div>
        {
          errors.username?.message && (
            <p className={styles.error}>{errors.username?.message}</p>
          )
        }

        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <InputField
            name='password'
            type='password'
            value= { infoUser.password }
            placeholder='Senha'
            register={ register }
            className={styles.inputField}
            onChange={ (event) => onChange(event, infoUser, setInfoUser )}
          />
        </div>
        {
          errors.password?.message && (
            <p className={styles.error}>{errors.password?.message}</p>
          )
        }

        {
          content === 'Entrar' && (
            <p className={styles.register}> Não tem conta? <a className={styles.link} onClick={ () => router.push('/register') }>Registrar</a></p>
          )
        }

        <Button
          className={styles.button}
          name={ content }
        />
      </div>
    </form>
  );
};

export default Form;