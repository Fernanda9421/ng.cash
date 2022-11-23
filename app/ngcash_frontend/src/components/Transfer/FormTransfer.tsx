import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from 'src/context/AppContext';
import { IDataCashIn } from 'src/context/interfaces';
import { cashInSchema } from 'src/schemas/userSchema';
import Button from '../Button';
import InputField from '../InputField';
import styles from '@/styles/Transfer/transfer.module.css';
import styleForm from '@/styles/Form/form.module.css';
import { FaUserAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { storageGetItem } from 'src/utils/localStorage';
import { requestPost, setToken } from 'src/services/requests';
import { Exception } from 'src/interfaces/error';
import SuccessTransfer from '../SuccessTransfer';

const FormTransfer: FunctionComponent = () => {
  const route = useRouter();
  const { onChange, dataCashIn, setDataCashIn } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [dataSuccess, setDataSuccess] = useState({
    value: 0,
    createdAt: '',
  });
  const { register, handleSubmit, formState: { errors } } = useForm<IDataCashIn>({
    resolver: yupResolver(cashInSchema),
  });

  const onSubmit = async (data: IDataCashIn) => {
    const { token, id } = storageGetItem('user');
    if (!token) route.push('/');
    setToken(token);

    try {
      const transaction = await requestPost(`/transaction/${id}`, data);
      const { value, createdAt } = transaction;
      setIsAuthenticated(true);
      setIsTransactionSuccess(true);
      setDataSuccess({value, createdAt});
    } catch (error) {
      const result = (error as Exception).response.data.message;
      console.log(result);
      setIsAuthenticated(false);
      setIsTransactionSuccess(false);
      route.push('/');
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
  );
};

export default FormTransfer;
