import { ChangeEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IDataCashIn } from 'src/context/interfaces';

export interface IFormInputs {
  username: string,
  password: string,
};

export interface Props {
  value: string | number,
  name: 'username' | 'password' | 'value',
  type: string,
  className: string,
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  register: UseFormRegister<any>,
  step?: string,
};
