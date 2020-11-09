## Aplicação

A aplicação consiste em um sistema de gerenciamento de estabelecimentos. Essa aplicação possui: CRUD de Estabelecimentos, Autenticação (Controle de quem acessa a aplicação) e Autorização (Controle do que cada usuário acessa na aplicação). Vale ressaltar que para desenvolver essa aplicação foi utilizado conceitos de TDD, DDD e SOLID para melhorar a qualidade do código.

## Requisitos

- Autenticação;
- CRUD de Estabelecimentos;

## Tecnologias/Bibliotecas Utilizadas

- Para mecanismo de banco de dados foi utilizado o PostgresSQL;

- Para conexão com o banco foi utilizado o ORM recomendado pelo NestJS, o Typeorm;

- Para tratamento de datas foi utilizado a biblioteca do date-fns pelo motivo da documentação ser mais completa e sua utilização ser mais fácil de compreender;

- Para autenticação foi utilizado o passport e o JWT;

- Para criptografia de senhas foi utilizado o bcrypt;

## Instalando a aplicação

### OBS: Antes de iniciar o backend é necessário se atentar à alguns pontos:

- É preciso ter um servico de banco de dados Postgres rodando, é possível criá-lo pelo docker-compose da aplicação.

- Antes de iniciar, copie o arquivo .env.example como .env e caso tenha alterado alguma informação do banco, alterar os dados das variáveis.

- É necessário também ter rodado as migrations para criar as tabelas do banco e os registros iniciais

Caso não tenha uma instância do postgres e queira subir utilizadno o docker da aplicação execute o seguinte comando:

```
$ docker-compose up vaibem_database -d
```

- OBS: Caso crie o banco pela aplicação, não se faz necessário atualizar o .env, apenas copie o exemplo, pois quando subimos o banco pelo docker da aplicação o mesmo já cria um banco ao qual está configurado no .env.example;

Após criar o banco, execute as migrations para criar as tabelas do banco de dados. Para isso, execute um dos seguites comandos:

```
$ yarn typeorm migration:run
$ npm run typeorm migration:run
```

Após criar executar as migrations, é hora de criarmos os primeiros registros base da aplicação como: Permissões, Perfis de Acesso e usuários default. Para criarmos esses registros, execute um dos seguintes comandos:

```
$ yarn seeds:run
$ npm run seeds:run
```

Existem 2 formas de colocar a aplicação para modo de execução

A primeira é pelo comando de execução do react utilizando o yarn ou npm:

```
$ yarn start:dev
$ npm run start:dev
```

A segunda é utilizando o docker para tal:

```
$ docker-compose up
```

Em ambos os casos a aplicação estará rodando no seguite endereço:

```
http://localhost:3000
```
