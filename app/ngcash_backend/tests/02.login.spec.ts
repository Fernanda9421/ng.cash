import 'jest';
import { randomName } from './helpers/randomName';
import { STATUS } from './helpers/statusCode';
import { ERROR } from './helpers/errorMessage';
import { post } from './helpers/requests';

const username = randomName();

beforeAll(async () => {
  const user = {
    username: username,
    password: 'Senha123'
  };
  const res = await post(user, '/register');
  await res.json();
})

describe('Login', () => {
  describe('Ao entrar na aplicação', () => {
    describe('com dados válidos', () => {
      it('deve retornar um token válido', async() => {
        const user = {
          username: username,
          password: 'Senha123'
        };
        const res = await post(user, '/login');
        const data = await res.json();

        expect(res.status).toEqual(STATUS.OK);
        expect(data.user).toHaveProperty('id');
        expect(data.user).toHaveProperty('username');
        expect(data.user).toHaveProperty('accountId');
        expect(data.token).not.toBeUndefined();
        expect(data.token).not.toBeNull();
      });
    });
    describe('Com dados inválidos', () => {
      describe('onde o username não existe no banco de dados', () => {
        it('deve retornar um erro', async() => {
          const user = {
            username: 'Paulo',
            password: 'Senha123'
          };
          const res = await post(user, '/login');
          const data = await res.json();
  
          expect(data.status).toEqual(STATUS.UNAUTHORIZED);
          expect(data.message).toEqual(ERROR.INVALID_FIELDS);
        });
      });
      describe('onde a senha está incorreta', () => {
        it('deve retornar um erro', async() => {
          const user = {
            username,
            password: 'outrasenha'
          };
          const res = await post(user, '/login');
          const data = await res.json();
  
          expect(data.status).toEqual(STATUS.UNAUTHORIZED);
          expect(data.message).toEqual(ERROR.INVALID_FIELDS);
        });
      });
    });
  });
});
