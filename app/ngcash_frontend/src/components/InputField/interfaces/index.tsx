import { ChangeEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface IFormInputs {
  username: string,
  password: string,
};

export interface Props {
  value: string,
  name: 'username' | 'password',
  type: string,
  className: string,
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  register: UseFormRegister<IFormInputs>,
};
