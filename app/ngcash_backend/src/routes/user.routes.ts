import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validUsername, validPassword } from '../middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  validUsername,
  validPassword,
  (req, res, next) => {
    userController.create(req, res, next);
  },
);

export default userRouter;
