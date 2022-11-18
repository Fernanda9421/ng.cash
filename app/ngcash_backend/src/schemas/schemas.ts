import { IErrors } from '../interfaces/IErrors';

const errors: IErrors = {
  invalidUsername: 'Username must be at least 3 characters long!',
  invalidPassword: 'Password must be at least 8 characters long, a number and an uppercase letter!',
};

const code = 400;

const blank = (value: string) => (!value);
const incorrectPassword = (value: string) => {
  const regex = /(?=.{8,}$)(?=.*?[A-Z])(?=.*?[0-9])/;
  return !(regex.test(value));
};
const isLengthLessThan = (value: string, min: number) => (value.length < min);

const validateUsername = (username:string) => {
  switch (true) {
    case blank(username):
      return { code, message: errors.invalidUsername };
    case isLengthLessThan(username, 3):
      return { code, message: errors.invalidUsername };
    default: return {};
  }
};

const validatePassword = (password:string) => {
  switch (true) {
    case blank(password):
      return { code, message: errors.invalidPassword };
    case incorrectPassword(password):
      return { code, message: errors.invalidPassword };
    default: return {};
  }
};

export { validateUsername, validatePassword };
