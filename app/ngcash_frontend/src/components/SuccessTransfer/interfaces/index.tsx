import { Dispatch, SetStateAction } from 'react';

type ITransactionSuccess = boolean;
type IErrorTransaction = boolean;

export interface IError {
  setIsTransactionSuccess: Dispatch<SetStateAction<ITransactionSuccess>> | Dispatch<SetStateAction<IErrorTransaction>>,
}

export interface ISuccess extends IError {
  user: string,
  value: number,
  date: string,
}
