import 'jest';
import { randomName } from './helpers/randomName';
import { STATUS } from './helpers/statusCode';
import { ERROR } from './helpers/errorMessage';
import { post, get } from './helpers/requests';

const username = randomName();

beforeAll(async () => {
  const user = {
    username: username,
    password: 'Senha123'
  };
  const res = await post(user, '/register');
  await res.json();
})

describe('Account', () => {
  describe('Ao entrar na aplicação', () => {
    describe('com dados válidos', () => {
      describe('e token válido', () => {
        it('deve ser capaz de visualizar seu saldo atual', async() => {
          const user = {
            username: username,
            password: 'Senha123'
          };
  
          const login = await post(user, '/login');
          const dataLogin = await login.json();
          const account = await get(dataLogin.user.id, dataLogin.token, '/account');
          const dataAccount = await account.json();
  
          expect(login.status).toEqual(STATUS.OK);
          expect(account.status).toEqual(STATUS.OK);
  
          expect(dataAccount).toHaveProperty('id');
          expect(dataAccount).toHaveProperty('balance');
        });
      });
      
      describe('e sem token', () => {
        it('deve retornar um erro', async() => {
          const user = {
            username: username,
            password: 'Senha123'
          };
  
          const login = await post(user, '/login');
          const dataLogin = await login.json();
          const account = await get(dataLogin.user.id, '', '/account');
          const dataAccount = await account.json();
  
          expect(login.status).toEqual(STATUS.OK);
          expect(account.status).toEqual(STATUS.UNAUTHORIZED);
  
          expect(dataAccount.message).toEqual(ERROR.TOKEN_NOT_FOUND);
        });
      });

      describe('e com token inváido', () => {
        it('deve retornar um erro', async() => {
          const user = {
            username: username,
            password: 'Senha123'
          };
          const invalid_token = 'token-invalido-123456';
  
          const login = await post(user, '/login');
          const dataLogin = await login.json();
          const account = await get(dataLogin.user.id, invalid_token, '/account');
          const dataAccount = await account.json();
  
          expect(login.status).toEqual(STATUS.OK);
          expect(account.status).toEqual(STATUS.UNAUTHORIZED);
  
          expect(dataAccount.message).toEqual(ERROR.INVALID_TOKEN);
        });
      })
    });
  });
});
