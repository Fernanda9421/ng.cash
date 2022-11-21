import 'jest';
import { randomName } from './helpers/randomName';
import { STATUS } from './helpers/statusCode';
import { ERROR } from './helpers/errorMessage';
import { post, get, postWithToken, getWithParams } from './helpers/requests';
import { Transaction } from './types/types';

const usernameCashOut = randomName();
const usernameCashIn = randomName();

const userCashOut = {
  username: usernameCashOut,
  password: 'Senha123'
};
const date = new Date().toISOString().split('T')[0];
const invalidIdUser = 200;

beforeAll(async () => {
  const userCashOut = {
    username: usernameCashOut,
    password: 'Senha123'
  };

  const userCashIn = {
    username: usernameCashIn,
    password: 'Senha456'
  };
  const responseCashOut = await post(userCashOut, '/register');
  const responseCashIn = await post(userCashIn, '/register');
  await responseCashOut.json();
  await responseCashIn.json();
})

describe('Transaction', () => {
  describe('Ao realizar a transação', () => {
    describe('com dados e token válidos', () => {
      describe('e dados para realizar a transação válidos', () => {
        it('a transação é realizada com sucesso', async () => {
          const dataCashIn = {
            username: usernameCashIn,
            value: 20
          }
  
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
          const dataTransaction = await transaction.json();

          expect(login.status).toEqual(STATUS.OK);
          expect(transaction.status).toEqual(STATUS.CREATED);

          expect(dataTransaction).toHaveProperty('id');
          expect(dataTransaction).toHaveProperty('value');
          expect(dataTransaction).toHaveProperty('debitedAccountId');
          expect(dataTransaction).toHaveProperty('creditedAccountId');
          expect(dataTransaction).toHaveProperty('createdAt');
        });
        it('os saldos são atualizados em suas respectivas contas', async () => {
          const dataCashIn = {
            username: usernameCashIn,
            value: 20
          }

          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
          const dataTransaction = await transaction.json();

          const accountDebited = await get(dataTransaction.debitedAccountId, dataLogin.token, '/account');
          const accountCredited = await get(dataTransaction.creditedAccountId, dataLogin.token, '/account');
          const dataCredited = await accountCredited.json();
          const dataDebited = await accountDebited.json();

          expect(dataCredited.balance).toEqual('140.00');
          expect(dataDebited.balance).toEqual('60.00');
        });
      });

      describe('e dados para realizar a transação inválidos', () => {
        describe('onde o username de cash out é o mesmo de cash in', () => {
          it('deve retornar um erro', async () => {
            const dataCashIn = {
              username: userCashOut.username,
              value: 20
            }

            const login = await post(userCashOut, '/login');
            const dataLogin = await login.json();
            const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
            const dataTransaction = await transaction.json();

            expect(login.status).toEqual(STATUS.OK);
            expect(transaction.status).toEqual(STATUS.BAD_REQUEST);

            expect(dataTransaction.message).toEqual(ERROR.INVALID_FIELDS);
          });
        });

        describe('onde o username de cash in não existe no banco', () => {
          it('deve retornar um erro', async () => {
            const dataCashIn = {
              username: 'nomeNãoCadastrado',
              value: 20
            }

            const login = await post(userCashOut, '/login');
            const dataLogin = await login.json();
            const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
            const dataTransaction = await transaction.json();

            expect(login.status).toEqual(STATUS.OK);
            expect(transaction.status).toEqual(STATUS.BAD_REQUEST);

            expect(dataTransaction.message).toEqual(ERROR.INVALID_FIELDS);
          });
        });

        describe('onde o valor de cash out é menor que 0', () => {
          it('deve retornar um erro', async () => {
            const dataCashIn = {
              username: usernameCashIn,
              value: -50
            }

            const login = await post(userCashOut, '/login');
            const dataLogin = await login.json();
            const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
            const dataTransaction = await transaction.json();

            expect(login.status).toEqual(STATUS.OK);
            expect(transaction.status).toEqual(STATUS.BAD_REQUEST);

            expect(dataTransaction.message).toEqual(ERROR.INVALID_BALANCE);
          });
        });

        describe('onde o saldo de cash out é menor que o valor para transação', () => {
          it('deve retornar um erro', async () => {
            const dataCashIn = {
              username: usernameCashIn,
              value: 150
            }

            const login = await post(userCashOut, '/login');
            const dataLogin = await login.json();
            const transaction = await postWithToken(dataCashIn, '/transaction', dataLogin.token, dataLogin.user.id);
            const dataTransaction = await transaction.json();

            expect(login.status).toEqual(STATUS.OK);
            expect(transaction.status).toEqual(STATUS.BAD_REQUEST);

            expect(dataTransaction.message).toEqual(ERROR.INVALID_BALANCE);
          });
        });
      });
    });
  });

  describe('Ao buscar as transações por usuário', () => {
    describe('com dados de usuário e token válidos', () => {
      describe('sem aplicar filtros, onde o usuário possui transações', () => {
        it('retorna todas as transações que o usuário participou', async () => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await get(dataLogin.user.id, dataLogin.token, '/transaction');
          const dataTransaction = await transaction.json();

          expect(transaction.status).toEqual(STATUS.OK);
          dataTransaction.map((transaction:Transaction) => {
            expect(transaction).toHaveProperty('id');
            expect(transaction).toHaveProperty('value');
            expect(transaction).toHaveProperty('debitedAccountId');
            expect(transaction).toHaveProperty('creditedAccountId');
            expect(transaction).toHaveProperty('createdAt');
            expect(transaction).toHaveProperty('creditedAccount');
            expect(transaction).toHaveProperty('debitedAccount');
          });
        })
      });

      describe('com filtro de data', () => {
        it('retorna as transações que o usuário participou filtradas por data', async () => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await getWithParams(dataLogin.user.id, dataLogin.token, '/transaction', `?createdAt=${date}`)
          const dataTransaction = await transaction.json();
          const isOnlyADate = dataTransaction.every((transaction:Transaction) => transaction.createdAt == date);
        
          expect(transaction.status).toEqual(STATUS.OK);
          expect(isOnlyADate).toBeTruthy();
        });
      });

      describe('com filtro de data e cash out', () => {
        it('retorna as transações que o usuário participou filtradas por data', async () => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await getWithParams(dataLogin.user.id, dataLogin.token, '/transaction', `?createdAt=${date}&cashOut=true`)
          const dataTransaction = await transaction.json();
          const isOnlyADate = dataTransaction.every((transaction:Transaction) => transaction.createdAt == date);
          const isOnlyCashOut = dataTransaction.every((transaction:Transaction) => transaction.debitedAccountId == dataLogin.user.id);

          expect(transaction.status).toEqual(STATUS.OK);
          expect(isOnlyADate).toBeTruthy();
          expect(isOnlyCashOut).toBeTruthy();
        });
      });

      describe('com filtro de data e cash in', () => {
        it('retorna as transações que o usuário participou filtradas por data', async () => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await getWithParams(dataLogin.user.id, dataLogin.token, '/transaction', `?createdAt=${date}&cashIn=true`)
          const dataTransaction = await transaction.json();
          const isOnlyADate = dataTransaction.every((transaction:Transaction) => transaction.createdAt == date);
          const isOnlyCashOut = dataTransaction.every((transaction:Transaction) => transaction.creditedAccountId == dataLogin.user.id);

          expect(transaction.status).toEqual(STATUS.OK);
          expect(isOnlyADate).toBeTruthy();
          expect(isOnlyCashOut).toBeTruthy();
        });
      });

      describe('onde o usuário não possui transações', () => {
        it('retorna um array vazio', async () => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await get(1, dataLogin.token, '/transaction');
          const dataTransaction = await transaction.json();

          expect(transaction.status).toEqual(STATUS.OK);
          expect(dataTransaction).toHaveLength(0);
        });
      });
    });

    describe('com dados de usuário inválidos', () => {
      describe('onde o usuário não está cadastrado no banco', () => {
        it('retorna um erro', async() => {
          const login = await post(userCashOut, '/login');
          const dataLogin = await login.json();
          const transaction = await get(invalidIdUser, dataLogin.token, '/transaction');
          const dataTransaction = await transaction.json();

          expect(transaction.status).toEqual(400);
          expect(dataTransaction.message).toEqual(ERROR.INVALID_USER);
        });
      });
    });
  });
});
