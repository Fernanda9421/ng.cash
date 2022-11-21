import 'jest';
import { randomName } from './helpers/randomName';
import { STATUS } from './helpers/statusCode';
import { ERROR } from './helpers/errorMessage';
import { post, get } from './helpers/requests';

describe('Register', () => {
  describe('Ao registrar um novo usuário', () => {
    describe('com dados válidos', () => {
      it('deve retornar um token válido', async() => {
        const newUser = {
          username: randomName(),
          password: 'Senha123'
        };
        const res = await post(newUser, '/register');
        const data = await res.json();

        expect(res.status).toEqual(STATUS.CREATED);
        expect(data.token).not.toBeUndefined();
        expect(data.token).not.toBeNull();
      });
      it('deve criar uma conta para o usuário, com saldo de R$100,00', async() => {
        const user = {
          username: randomName(),
          password: 'Senha123'
        };
        const res = await post(user, '/register');
        const data = await res.json();

        const resAccount = await get(data.user.id, data.token, '/account');
        const dataAccount = await resAccount.json();

        expect(resAccount.status).toEqual(STATUS.OK);
        expect(dataAccount.id).toEqual(data.user.id);
        expect(dataAccount.balance).toEqual('100,00');
      });
    });
    describe('Com dados inválidos', () => {
      describe('onde o username já existe no banco de dados', () => {
        it('deve retornar um erro', async() => {
          const newUser = {
            username: 'Fernanda',
            password: 'Senha123'
          };
          await post(newUser, '/register');
          const res = await post(newUser, '/register');
          const data = await res.json();
  
          expect(data.status).toEqual(STATUS.BAD_REQUEST);
          expect(data.message).toEqual(ERROR.ALREADY_EXISTS);
        });
      });
      describe('onde o username tem menos de 3 caracteres', () => {
        it('deve retornar um erro', async() => {
          const newUser = {
            username: 'Mo',
            password: 'Senha123'
          };
          const res = await post(newUser, '/register');
          const data = await res.json();       
  
          expect(res.status).toEqual(STATUS.BAD_REQUEST);
          expect(data.message).toEqual(ERROR.INVALID_USERNAME);
        });
      });
      describe('onde a senha é inválida', () => {
        it('deve retornar um erro', async() => {
          const newUser = {
            username: randomName(),
            password: 'senha'
          };
          const res = await post(newUser, '/register');
          const data = await res.json();       
  
          expect(res.status).toEqual(STATUS.BAD_REQUEST);
          expect(data.message).toEqual(ERROR.INVALID_PASSWORD);
        });
      });
    });
  });
});
