import { Exception } from '../interfaces/error';
import { requestGet } from '../services/requests';
import { PropsAllTransactions } from './interfaces';

export const getAllTransactions = async ({
  id, setIsAuthenticated, setTransactions, setIsFiltered, route
}:PropsAllTransactions) => {
  try {
    const transactions = await requestGet(`/transaction/${id}`);
    setIsAuthenticated(true);
    setTransactions(transactions);
    setIsFiltered(false);
  } catch (error) {
    const result = (error as Exception).response.data.message;
    setIsAuthenticated(false);
    route.push('/');
  }
};
