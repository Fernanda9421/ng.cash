import { FunctionComponent } from 'react';
import { Props } from './interfaces';

const InputField: FunctionComponent<Props> = ({
  name, value, type, className, placeholder, onChange, register,
}) => {
  return (
    <input
      className={className}
      id={name}
      value={value}
      type={type}
      placeholder={placeholder}
      {...register(name)}
      onChange={onChange}
    />
  );
};

export default InputField;
