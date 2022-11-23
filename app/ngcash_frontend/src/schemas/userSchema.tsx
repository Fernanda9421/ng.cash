import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const errors = {
  blank: 'Campo é obrigatório',
  invalidUsername: 'Mínimo 3 caracteres',
  invalidPassword: 'Mínimo 8 caracteres, 1 número e 1 letra maiúscula',
  invalidValue: 'Valor deve ser maior que 0',
};

export const userSchema = yup.object({
  username: yup.string().min(3, errors.invalidUsername).required(errors.blank),
  password: yup.string()
    .minUppercase(1, errors.invalidPassword).minNumbers(1, errors.invalidPassword)
    .min(8, errors.invalidPassword).required(errors.blank),
}).required();

export const cashInSchema = yup.object({
  username: yup.string().min(3, errors.invalidUsername).required(errors.blank),
  value: yup.number().min(0.01, errors.invalidValue).required(errors.blank),
});
