import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { validateToken } from '../middlewares/token.middleware';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post(
  '/:id',
  validateToken,
  (req, res, next) => {
    transactionController.createTransaction(req, res, next);
  },
);

export default transactionRouter;
