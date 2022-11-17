import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  (req, res, next) => {
    loginController.login(req, res, next);
  },
);

export default loginRouter;
