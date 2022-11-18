import express = require('express');
import cors = require('cors');
import userRouter from './routes/user.routes';
import handleError from './middlewares/error.middleware';
import loginRouter from './routes/login.routes';
import accountRouter from './routes/account.routes';
import transactionRouter from './routes/transaction.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use('/register', userRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/account', accountRouter);
    this.app.use('/transaction', transactionRouter);

    this.app.use(handleError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
  }
}

export { App };
