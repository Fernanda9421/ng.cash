import { Dispatch, SetStateAction } from 'react';

type ITransactionSuccess = boolean;

export interface ISuccess {
  user: string,
  value: number,
  date: string,
  setIsTransactionSuccess: Dispatch<SetStateAction<ITransactionSuccess>>,
}
