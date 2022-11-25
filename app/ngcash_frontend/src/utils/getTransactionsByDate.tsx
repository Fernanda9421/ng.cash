import { Exception } from '../interfaces/error';
import { requestGet } from '../services/requests';
import { PropsTransactionsByDate } from './interfaces';

export const getTransactionsByDate = async ({
  id, dateSelected, type, setTransactions, setIsFiltered
}: PropsTransactionsByDate) => {
  try {
    const transactions = await
    requestGet(`/transaction/${id}?createdAt=${dateSelected}&${type}=true`);
    setTransactions(transactions);
    setIsFiltered(true);
    
  } catch (error) {
    const result = (error as Exception).response.data.message;
    console.log(result);
  }
};
