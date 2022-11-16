import { Request, Response, NextFunction } from 'express';
import { validateUsername, validatePassword } from '../schemas/schemas';

const validUsername = (req:Request, res:Response, next:NextFunction) => {
  const { username } = req.body;
  const validations = validateUsername(username);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

const validPassword = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body;
  const validations = validatePassword(password);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

export { validUsername, validPassword };
