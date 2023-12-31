# GoBarber2.0

## 💻 Projeto

GoBarber2.0 é uma aplicação que pode ser usado para gerenciamento de barbearia. A aplicação mobile pode ser usado pelos usuários que querem fazer agendamentos e a versão web deve ser usada pelos barbeiros da barbearia.

Essa aplicação foi desenvolvida para completar o projeto 7.0.

## 🚀 Stack de Desenvolvimento

- NodeJS, Yarn, JavaScript, Nodemon, Sucrase, EditorConfig, ESLint, Prettier etc. — core da platforma e ferramentas de desenvolvimento.
- Express, helmet, cors, etc. — HTTP-server configurações padrão.
- ReactJS, React Native, Expo, etc. — Criação das interfaces Web e Mobile.
- PostgresSQL, Redis, MongoDB, Mongoose, Sequelize, pg — SQL, Chave/Valor, NoSQL, ORM e Models.

## 🔥 Como iniciar a aplicação

1. Faça um clone desse repositório;
2. Entre na pasta `cd gobarber2.0`

### Como iniciar a aplicação backend

1. Entre na pasta frontend: `cd backend`.
2. Renomei o arquivo `.env.example` para `.env` e adicione **todas** as variáveis dentro do arquivo.
3. Instale as dependências do projeto: `yarn install`.
4. Rode as migrations: `yarn sequelize db:migrate`.
5. Inicie o servidor: `yarn start`.
6. Inicie a fila: `yarn queue`.

### Como iniciar a aplicação frontend

1. Entre na pasta frontend: `cd frontend`.
2. Instale as dependências do projeto: `yarn install`.
3. Inicie a aplicação web: `yarn start`.

### Como iniciar a aplicação mobile

1. Entre na pasta mobile: `cd mobile`
2. Instale as dependências do projeto: `yarn install`.
3. Inicie a aplicação mobile: `yarn start`.

## 🤔 Como contribuir

1. Faça um fork desse repositório;
2. Cria uma branch com a sua feature: `git checkout -b minha-feature`;
3. Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
4. Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
