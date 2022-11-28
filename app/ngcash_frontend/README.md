<br />
<div align="center">
  <h3 align="center">NG.CA$H</h3>
  <p align="center">
    NG.CA$H é uma aplicação em NextJs, com o objetivo de possibilitar que usuários da NG consigam realizar transferências internas entre si.
  </p>
  <br />
  <br />
    <p><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Nextjs"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></p>
</div>
<br />
<br />

## Conteúdos:

- Projeto
  - [Sobre](#sobre)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Funcionalidades](#funcionalidades)
- [Autor](#autor)

<br />
<br />

# Projeto:

## Sobre
- Com essa aplicação, o usuário será capaz de:
  - Realizar o cadastro na NG informando username e password;
  - Realizar o login informando username e password;
  - Com o usuário logado, a página principal contém:
    - Saldo atual do usuário;
    - Atalho para página de Operações realizadas;
    - Atalho para página de realizar uma transação;
    - Botão para realizar *log-out*.
  - Com o usuário logado, a página de Operações contém:
    - Tabela com detalhes de todas as transações que o usuário participou;
    - Mecanismo para filtrar a tabela por data e/ou transações do tipo *cash-in / cash-out*;
    - Botão para voltar à página principal (no logotipo da empresa, localizado no *Header*);
    - Botão para realizar *log-out*.
  - Com o usuário logado, a página de Realizar transações contém:
    - Área para realização de transferências para outros usuários NG a partir do username de quem sofrerá *cash-in*;
    - Botão para voltar à página principal (no logotipo da empresa, localizado no *Header*);
    - Botão para realizar *log-out*.

## Estrutura do Projeto

**Docker:**
- O Docker tem o papel de unir todas as partes e subir o projeto completo com um comando único, via `docker-compose`;
- Na raíz do projeto, rode o comando:
```bash
 docker-compose -f docker-compose.yaml up --build
```

**Banco de Dados:**
> **OBS:** Esses passos só serão necessários caso você não utilize o *Docker*.
- Tem o papel de fornecer dados para o serviço back-end.
- Conta com um script `db:reset` para resetar, criar e rodar as migrations do banco de dados. Você pode usá-lo em app/ngcash_backend com o comando `npm run db:reset`;

**Back-end:**
> **OBS:** Esses passos só serão necessários caso você não utilize o *Docker*.
- Para rodar localmente, em ambiente de desenvolvimento, é necessário alterar o arquivo `.env.example`, preenchendo os valores das variáveis de ambiente condizentes com o seu ambiente de desenvolvimento. Lembre-se de renomear o arquivo para `.env`.
- Conta com o script `dev` para rodar a aplicação. Você pode usá-lo em app/ngcash_backend com o comando `npm run dev`;

**Front-end:**
> **OBS:** Esses passos só serão necessários caso você não utilize o *Docker*.
- Conta com o script `dev` para rodar a aplicação. Você pode usá-lo em app/ngcash_frontend com o comando `npm run dev`;

## Funcionalidades

### Registro:
- Campos de `Username` e `Senha`, com as seguintes validações:
  - O `username` deve possuir pelo menos 3 caracteres;
  - A `senha` deve possuir pelo menos 8 caracteres, 1 letra maiúscula e 1 número.
- Caso o cadastro seja bem sucedido, o usuário é redirecionado para a página principal.

### Login:
- Campos de `Username` e `Senha`, com as mesmas validações contidas na página de Registro;
- Campos de `Username` e `Senha` devem ser iguais aos valores registrados anteriormente;
- Botão que redireciona para a página de `Registro`.

### Página principal:
- Seção com o `username` do usuário logado;
- Saldo atual do usuário, que inicia sempre com um valor de R$100,00.
- Botão para página de `Operações`;
- Botão para página de `Realizar transferência`;
- Botão de `Log-out`.

### Operações:
- Página que mostra o histórico de transações do usuário.
- Caso o usuário ainda não tenha participado de nenhuma transação até o momento, a página exibe:
  - Uma mensagem informando que o usuário ainda não possui transações;
  - Um botão que redireciona para página de `Realizar transferência`;
  - Um botão que redireciona para a `Página principal`;
  - Botão de `Log-out`.
- Caso o usuário já tenha participado de transações,  página exibe:
  - Botão `Enviados por você`, que exibe uma tabela com todas as transações de *cash-out* que o usuário participou;
  - Botão `Enviados para você`, que exibe uma tabela com todas as transações de *cash-in* que o usuário participou;
  - Filtrar as tabelas por data da transação e *cash-out*;
  - Filtrar as tabelas por data da transação e *cash-in*;
  - Exibir todas as transações que o usuário participou;
  - Um botão que redireciona para a `Página principal`;
  - Botão de `Log-out`.

### Área de transferência:
- Página que permite ao usuário realizar transferência para outro usuário da NG.
- Caso o usuário que sofrerá *cash-in* não esteja cadastrado na NG ou o saldo atual de quem realizará o *cash-out* seja insuficiente, a página exibe:
  - Uma mensagem informando que a transferência foi mal sucedida;
  - Um botão que redireciona para página de `Realizar transferência`;
  - Um botão que redireciona para a `Página principal`;
  - Botão de `Log-out`.
- Caso o usuário que sofrerá *cash-in* esteja cadastrado na NG e o saldo atual de quem realizará o *cash-out* seja válido, a página exibe:
  - Uma mensagem informando que a transferência foi bem sucedida;
  - Informações relacionadas à transferência;
  - Um botão que redireciona para página de `Realizar transferência`;
  - Um botão que redireciona para a `Página principal`;
  - Botão de `Log-out`.
- O valor da transferência deve ser um número positivo.


# Autor:
- [Linkedin](https://www.linkedin.com/in/fernandaacarvalho/)
- [Github](https://github.com/Fernanda9421)