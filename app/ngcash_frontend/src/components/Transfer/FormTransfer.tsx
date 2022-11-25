import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../context/AppContext';
import { IDataCashIn } from '../../context/interfaces';
import { cashInSchema } from '../../schemas/userSchema';
import Button from '../Button';
import InputField from '../InputField';
import styles from '../../styles/Transfer/transfer.module.css';
import styleForm from '../../styles/Form/form.module.css';
import { FaUserAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { storageGetItem } from '../../utils/localStorage';
import { requestPost, setToken } from '../../services/requests';
import { Exception } from '../../interfaces/error';
import SuccessTransfer from '../SuccessTransfer';
import ErrorTransfer from '../ErrorTransfer';

const FormTransfer: FunctionComponent = () => {
  const route = useRouter();
  const { onChange, dataCashIn, setDataCashIn, setError, error } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [dataSuccess, setDataSuccess] = useState({
    value: 0,
    createdAt: '',
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IDataCashIn>({
    resolver: yupResolver(cashInSchema),
  });

  const onSubmit = async (data: IDataCashIn) => {
    const { token, id } = storageGetItem('user');
    if (!token) route.push('/');
    setToken(token);
    reset({ username: '', value: 0.01 });

    try {
      const transaction = await requestPost(`/transaction/${id}`, data);
      const { value, createdAt } = transaction;
      setIsAuthenticated(true);
      setIsTransactionSuccess(true);
      setDataSuccess({value, createdAt});
      setError('');
    } catch (error) {
      const result = (error as Exception).response.data.message;
      console.log(result);
      setIsAuthenticated(false);
      setIsTransactionSuccess(false);
      setError(result);
    }
  };

  return (
    isAuthenticated && isTransactionSuccess ? (
      <SuccessTransfer
        user={dataCashIn.username}
        value={dataSuccess.value}
        date={dataSuccess.createdAt}
        setIsTransactionSuccess={ setIsTransactionSuccess }
      />
    ) : (
      error ? (
        <ErrorTransfer setIsTransactionSuccess={ setIsTransactionSuccess } />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <label htmlFor="username">Username</label>
              <div className={styleForm.inputBox}>
                <FaUserAlt className={styleForm.icon} />
                <InputField
                  value={dataCashIn.username}
                  name='username'
                  type='text'
                  className={styleForm.inputField}
                  placeholder='Username'
                  onChange={(event) => onChange(event, dataCashIn, setDataCashIn)}
                  register={register}
                />
              </div>
              {
                errors.username?.message && (
                  <p className={styleForm.error}>{errors.username?.message}</p>
                )
              }
            </div>
            <div className={styles.input}>
              <label htmlFor="value">Valor</label>
              <div className={styleForm.inputBox}>
                <FaMoneyBillAlt className={styleForm.icon} />
                <InputField
                  value={dataCashIn.value}
                  name='value'
                  type='number'
                  className={styleForm.inputField}
                  placeholder='Valor'
                  step='0.01'
                  onChange={(event) => onChange(event, dataCashIn, setDataCashIn)}
                  register={register}
                />
              </div>
              {
                errors.value?.message && (
                  <p className={styleForm.error}>{errors.value?.message}</p>
                )
              }
            </div>
            <Button
              className={styleForm.button}
              name='Transferir'
            />
          </div>
        </form>
      )
    )
  );
};

export default FormTransfer;
