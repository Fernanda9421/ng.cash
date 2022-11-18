import { Request, Response, NextFunction } from 'express';
import { IUsername, IPassword } from '../interfaces/INewUser';
import { validateUsername, validatePassword } from '../schemas/schemas';

const validUsername = (req:Request, res:Response, next:NextFunction):Response | void => {
  const { username }:IUsername = req.body;
  const validations = validateUsername(username);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

const validPassword = (req:Request, res:Response, next:NextFunction):Response | void => {
  const { password }:IPassword = req.body;
  const validations = validatePassword(password);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

export { validUsername, validPassword };
