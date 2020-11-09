## Aplicação

A aplicação consiste em um sistema de gerenciamento de estabelecimentos. Essa aplicação possui: CRUD de Estabelecimentos, Autenticação (Controle de quem acessa a aplicação) e Autorização (Controle do que cada usuário acessa na aplicação). Vale ressaltar que para desenvolver essa aplicação foi utilizado conceitos de TDD, DDD e SOLID para melhorar a qualidade do código.

## Requisitos

-   Autenticação;
-   CRUD de Estabelecimentos;

## Tecnologias/Bibliotecas Utilizadas

-   Para o desenvolvimento de formulários e listagens a fim de facilitar o desenvolvimento e melhorar a experiência do usuário ao utilizar o sistema foi utilizado a biblioteca do bootstrap.

-   Alguns componentes da aplicação foi desenvolvido utilizando a biblioteca do Styled-Components para ajudar na criação e organização de componentes reutilizáveis de modo mais prático, separando também sua estilização dos demais.

-   Para ajustar cores e tornar alguns componentes mais claros ou escuros, foi utilizado a biblioteca do Polished.

-   Para os ícones da aplicação, foi utilizado a biblioteca do react-icons.

-   Para gerenciamento do token do usuário foi utilizado o Jsonwebtoken, famoso JWT.

-   Para tratamento de datas foi utilizado a biblioteca do date-fns pelo motivo da documentação ser mais completa e sua utilização ser mais fácil de compreender

-   Para requisições HTTP foi utilizada a biblioteca do axios para facilitar a requisição sem refreshs na página. A mesma foi escolhida por ser a mais utilizada do mercado.

## Instalando a aplicação

### OBS: Antes de iniciar o frontend é necessário se atetar à alguns pontos:

-   Para que o frontend funcione perfeitamente, execute primeiramente o bakend da aplicação.
-   Antes de iniciar, copie o arquivo .env.example como .env e caso tenha alterado alguma informação do backend, alterar os dados das variáveis.

Existem 2 formas de colocar a aplicação para modo de execução

A primeira é pelo comando de execução do react utilizando o yarn ou npm:

```
$ yarn start
$ npm run start
```

A segunda é utilizando o docker para tal:

```
$ docker-compose up
```

Em ambos os casos a aplicação estará rodando no seguite endereço:

```
http://localhost:3333
```
