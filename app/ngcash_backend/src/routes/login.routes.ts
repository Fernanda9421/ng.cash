import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';
import { validateToken } from '../middlewares/token.middleware';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  validateToken,
  (req, res, next) => {
    loginController.login(req, res, next);
  },
);

export default loginRouter;
