import { SubmitHandler } from 'react-hook-form';
import { IFormInputs } from '@/components/InputField/interfaces';

export interface Props {
  onSubmit: SubmitHandler<IFormInputs>;
  content: string;
}
