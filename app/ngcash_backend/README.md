<br />
<div align="center">
  <h3 align="center">NG.CA$H API</h3>
  <p align="center">
    NG.CA$H é uma API REST, com o objetivo de possibilitar que usuários da NG consigam realizar transferências internas entre si.
  </p>
  <br />
  <p><img src="https://camo.githubusercontent.com/a1eae878fdd3d1c1b687992ca74e5cac85f4b68e60a6efaa7bc8dc9883b71229/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3333393933333f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f6465646f746a73266c6f676f436f6c6f723d7768697465" /><img src="https://camo.githubusercontent.com/0ed8c0157d26ec3dc9806b78077d3f44358b7df649fa9a8a7cedaff07af291d6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d54797065736372697074266c6f676f436f6c6f723d7768697465" /><img src="https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465" /><img src="https://camo.githubusercontent.com/6c50eb6f911b1bcb4c0b790fb5e908bf896c525685839fa802c41349dcd1c8bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53657175656c697a652d3532423045373f7374796c653d666f722d7468652d6261646765266c6f676f3d53657175656c697a65266c6f676f436f6c6f723d7768697465" /><img src="https://camo.githubusercontent.com/3533d3ac5e34afefc4d1c00c5bfd94f88324ee4a5e93ee60386571de5ed67062/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f504f535447524553514c2d3333363739312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d506f737467726553514c266c6f676f436f6c6f723d7768697465" /></p>
</div>
<br />
<br />

## Conteúdos:

- Projeto
  - [Sobre](#sobre)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [API Reference](#api-reference)
- [Autor](#autor)

<br />
<br />

# Projeto:

## Sobre

- Arquitetar e desenvolver uma API para gerenciamento de contas digitais (com Sequelize ORM);
- Criar *endpoints* (seguindo os princípios REST) que serão utilizados para conexão com o banco de dados;
- Lidar com erros (mesagens e *status code* específicos);
- Criar tabelas e respectivas associações: *Users*, *Accounts*, *Transactions*;

## Estrutura do Projeto

**Docker:**
- O Docker tem o papel de unir todas as partes e subir o projeto completo com um comando único, via `docker-compose`;
- A `Dockerfile` e o `docker-compose` estão configurados.
- Na raíz do projeto, rode o comando `docker-compose up -d`.

**Banco de Dados:**
- Tem o papel de fornecer dados para o serviço back-end.
- Conta com um script `db:reset` para resetar, criar e rodar as migrations do banco de dados. Você pode usá-lo em app/ngcash_backend com o comando `npm run db:reset`;
- **OBS:** Esses passos só serão necessários caso você não utilize o *Docker*.

**Back-end:**
- Para rodar localmente, em ambiente de desenvolvimento, é necessário alterar o arquivo `.env.example`, preenchendo os valores das variáveis de ambiente condizentes com o seu ambiente de desenvolvimento. Lembre-se de renomear o arquivo para `.env`.
- Conta com o script `dev` para rodar a aplicação. Você pode usá-lo em app/ngcash_backend com o comando `npm run dev`;
- **OBS:** Esses passos só serão necessários caso você não utilize o *Docker*.

## *API Reference*

### **Cadastro de usuários:**

```http
POST /register
```

**Corpo da requisição:**
```json
{
  "username": "Usuário",
  "password": "Senha-123"
}
```

**Validações:**
- *Username*: deve ser único e composto por, pelo menos, 3 caracteres.
- *Password*: composta por pelo menos 8 caracteres, um número e uma letra maiúscula.

**Observações:**
- A senha é *hasheada* ao ser armazenada no banco de dados.
- Durante o processo de cadastro de um novo usuário, sua respectiva conta é criada automaticamente na tabela `Accounts`, com um *balance* de R$ 100,00.
- Caso o cadastro seja bem sucedido, um *token* é gerado e retornado.

**Retorno da requisição:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZlcm5hbmRhIiwiaWQiOjksImlhdCI6MTY2ODg2NDIyOSwiZXhwIjoxNjY4OTUwNjI5fQ.nkJnG8-2Hd7Pgs8zU4qg5P4f0GPvWJHOh_35e_vBE1E"
}
```

<br />

### **Login:**

```http
POST /login
```

**Corpo da requisição:**
```json
{
  "username": "Usuário",
  "password": "Senha-123"
}
```

**Validações:**
- *Username*: o usuário deve estar cadastrado no banco.
- *Password*: a senha é comparada com o *hash* gerado.

**Observações:**
- Caso o login seja bem sucedido, um *token* é gerado e retornado.

**Retorno da requisição:**
```json
{
    "user": {
        "id": 1,
        "username": "Usuário",
        "accountId": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZlcm5hbmRhIiwiaWQiOjksImlhdCI6MTY2ODg2NTA2OCwiZXhwIjoxNjY4OTUxNDY4fQ.nTbQBEgLaj0Dr-OPuezBmaFdlCtq_VfFarSIxHdg6i4"
}
```

<br />

### **Visualização de saldo atual:**

```http
GET /account/:id
```

**Validações:**
- *Token*: o token deve ser válido.

**Observações:**
- Os detalhes da conta do usuário é retornado baseado no `id` da rota;
- A requisição deve conter um token de autenticação no `headers`;

**Retorno da requisição:**
```json
{
  "id": 9,
  "balance": "100,00"
}
```

<br />

### **Realização de *cash-out*:**

```http
POST /transaction/:id
```

**Corpo da requisição:**
```json
{
  "username": "Usuário2",
  "value": 25.00
}
```

**Validações:**
- *Username*: o usuário que sofrerá *cash-in* deve estar cadastrado no banco. 
- *Value*: o valor deve ser menor ou igual ao saldo do usuário que realiza a transferência.
- *Token*: o token deve ser válido.
- O usuário que realiza *cash-out* não pode ser igual ao usuário que sofre *cash-in*.

**Observações:**
- O usuário que realiza *cash-out* é baseado no `id` da rota;
- A requisição deve conter um token de autenticação no `headers`;
- Caso a transação seja bem sucedida, ela será registrada na tabela `Transactions`.

**Retorno da requisição:**
```json
{
  "id": 10,
  "value": "20",
  "debitedAccountId": 1,
  "creditedAccountId": 9,
  "createdAt": "2022-11-19"
}
```

<br />

### **Visualização de transações:**

```http
GET /transaction/:id
```

**Validações:**
- *Token*: o token deve ser válido.

**Observações:**
- Os detalhes das transações que o usuário participou é retornado baseado no `id` da rota;
- A requisição deve conter um token de autenticação no `headers`;

**Retorno da requisição:**
```json
[
  {
    "id": 10,
    "value": "20",
    "debitedAccountId": 1,
    "creditedAccountId": 9,
    "createdAt": "2022-11-19",
    "creditedAccount": {
      "id": 9,
      "user": {
        "username": "Usuário2"
      }
    },
    "debitedAccount": {
      "id": 1,
      "user": {
        "username": "Usuário1"
      }
    }
  },
  {
    ...
  }
]
```

<br />

### **Visualização de transações com filtros:**

**Filtro por data**
```http
GET /transaction/:id?createdAt=2022-11-19
```

**Filtro por data e *cash-in***
```http
GET /transaction/:id?createdAt=2022-11-19&cashIn=true
```

**Filtro por data e *cash-out***
```http
GET /transaction/:id?createdAt=2022-11-19&cashOut=true
```

**Validações:**
- *Token*: o token deve ser válido.

**Observações:**
- Os detalhes das transações que o usuário participou é retornado baseado no `id` da rota;
- A requisição deve conter um token de autenticação no `headers`;
- **Caso o usuário deseje filtrar apenas por data:**
  - A requisição deve conter a chave `createdAt` e o valor com a data desejada no `params`.
- **Caso o usuário deseje filtrar por data e cash-out:**
  - A requisição deve conter no `params`:
    - a chave `createdAt` e o valor com a data desejada;
    - a chave `cashOut` e o valor true.
- **Caso o usuário deseje filtrar por data e cash-in:**
  - A requisição deve conter no `params`:
    - a chave `createdAt` e o valor com a data desejada;
    - a chave `cashIn` e o valor true.


**Retorno da requisição:**
```json
[
  {
    "id": 10,
    "value": "20",
    "debitedAccountId": 1,
    "creditedAccountId": 9,
    "createdAt": "2022-11-19",
    "creditedAccount": {
      "id": 9,
      "user": {
        "username": "Usuário2"
      }
    },
    "debitedAccount": {
      "id": 1,
      "user": {
        "username": "Usuário1"
      }
    }
  },
  {
    ...
  }
]
```

# Autor:
- [Linkedin](https://www.linkedin.com/in/fernandaacarvalho/)
- [Github](https://github.com/Fernanda9421)