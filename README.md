<br />
<div align="center">
  <h3 align="center">NG.CA$H</h3>
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
  - [Inicialize a Aplicação](#inicialize-a-aplicação)
  - [Testes de integração](#testes-de-integração)
  - [Configuração de portas da aplicação](#configuração-de-portas-da-aplicação)
  - [Documentação](#documentação)
- [Autor](#autor)

<br />
<br />

# Projeto:

## Sobre

### NG.CASH Backend

- Arquitetar e desenvolver uma API para gerenciamento de contas digitais (com Sequelize ORM);
- Criar *endpoints* (seguindo os princípios REST) que serão utilizados para conexão com o banco de dados;
- Lidar com erros (mesagens e *status code* específicos);
- Criar tabelas e respectivas associações: *Users*, *Accounts*, *Transactions*;

## Inicialize a Aplicação

- Certifique-se de estar na raíz do projeto, onde o arquivo `docker-compose.yaml` se encontra;
- Rode o comando:
  ```bash
  docker-compose -f docker-compose.yaml up --build
  ```

## Testes de integração:
- Certifique-se de que os containers `app_backend` e `db` estão com `status: Up`, com o comando:
  ```bash
  docker ps
  ```
- Com outro terminal aberto, entre no diretório `ngcash_backend`;
- Escolha o comando abaixo que melhor se encaixa no seu caso:
  - Se for rodar os testes pela primeira vez:

    ```bash
    npm run prepare-and-test
    ```

  - Se as dependências já foram instaladas previamente:

    ```bash
    npm test
    ```

## Configuração de portas da aplicação:

> **Banco de dados:** `Porta 3002`;

> **Backend:** `Porta 3001`;

## Documentação

Toda a documentação da API se encontra no diretório [ngcash_backend](app/ngcash_backend/README.md);

# Autor:
- [Linkedin](https://www.linkedin.com/in/fernandaacarvalho/)
- [Github](https://github.com/Fernanda9421)