import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from '../../context/AppContext';
import {  setToken } from '../../services/requests';
import { storageGetItem } from '../../utils/localStorage';
import Button from '../Button';
import styles from '../../styles/FiltersTransactions/filtersTransactions.module.css';
import { IType, IUser } from './interfaces';
import { getTransactionsByDate } from '../../utils/getTransactionsByDate';

const FiltersTransactions:FunctionComponent<IType> = ({type}) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setIsFiltered, setTransactions } = useContext(AppContext);
  const [user, setUser] = useState({
    username: '',
    id: 0,
  } as IUser);

  const route = useRouter();

  useEffect(() => {
    const { token, id, username } = storageGetItem('user');
  
    if (!token) route.push('/');
    setToken(token);
    setUser({ id, username });
    setIsAuthenticated(true);
  }, [route]);

  return (
    <div className={styles.container}>
      <div className={styles.boxDateSelected}>
        <div className='flex items-center justify-between w-3/6'>
          <span className={styles.date}>Data:</span>
          <DatePicker
            className={styles.inputCalendary}
            dateFormat='dd/MM/yyyy'
            selected={ dateSelected }
            onChange={ (date:Date) => setDateSelected(date) }
          />
        </div>
        <Button
          className={styles.button}
          name='Transações por data'
          onClick={() => getTransactionsByDate({id: user.id, dateSelected, type, setTransactions, setIsFiltered})} />
      </div>
    </div>
  );
};

export default FiltersTransactions;
