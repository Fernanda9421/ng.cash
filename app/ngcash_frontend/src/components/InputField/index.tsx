import { FunctionComponent } from 'react';
import { Props } from './interfaces';

const InputField: FunctionComponent<Props> = ({
  name, value, type, className, placeholder, onChange, register, step
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
      step={step}
    />
  );
};

export default InputField;
