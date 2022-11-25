import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from '../../context/AppContext';
import { Exception } from '../../interfaces/error';
import { requestGet, setToken } from '../../services/requests';
import { storageGetItem } from '../../utils/localStorage';
import Button from '../Button';
import styles from '../../styles/FiltersTransactions/filtersTransactions.module.css';

type IUser = {
  username: string,
  id: number,
}

const FiltersTransactions = ({type}:any) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setIsFiltered, setTransactions }:any = useContext(AppContext);
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

  const getTransactionsByDate = async () => {
    try {
      const transactions = await
      requestGet(`/transaction/${user.id}?createdAt=${dateSelected}&${type}=true`);
      setTransactions(transactions);
      setIsFiltered(true);
      console.log(transactions);
      
    } catch (error) {
      const result = (error as Exception).response.data.message;
      console.log(result);
    }
  };

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
        <Button className={styles.button} name='Transações por data' onClick={async () => await getTransactionsByDate()} />
      </div>
    </div>
  );
};

export default FiltersTransactions;
