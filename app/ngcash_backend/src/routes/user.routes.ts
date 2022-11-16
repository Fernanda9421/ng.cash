import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validUsername, validPassword } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post(
  '/',
  validUsername,
  validPassword,
  (req, res, next) => {
    userController.create(req, res, next);
  },
);

export default userRouter;
