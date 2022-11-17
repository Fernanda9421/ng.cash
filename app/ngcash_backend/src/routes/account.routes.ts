import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { validateToken } from '../middlewares/token.middleware';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get(
  '/:id',
  validateToken,
  (req, res, next) => {
    accountController.getBalanceById(req, res, next);
  },
);

export default accountRouter;
