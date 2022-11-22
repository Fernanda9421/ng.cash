import { FunctionComponent } from 'react';
import { Props } from './interfaces';

const Button: FunctionComponent<Props> = ({
  className, name, onClick
}) => {
  return (
    <button
      type='submit'
      className={className}
      onClick={onClick}
    >
      { name }
    </button>
  );
};

export default Button;
