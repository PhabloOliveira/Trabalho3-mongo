# Trabalho3Banco-de-Dados-MONGODB

# Trabalho3 - API MongoDB (Authors, Users, Books, Loans)

Este projeto implementa uma API REST simples usando Express e Mongoose para gerenciar autores, usuários, livros e empréstimos.

## Funcionalidades principais
- CRUD Authors, Users, Books
- Empréstimos com regras de negócio (disponibilidade de livros e expectedReturnDate)
- Migrations (migrate-mongo) e seed script para popular dados iniciais
- Script `collections` para resetar as coleções do banco
- Arquivo `routes.http` com exemplos de requests

## Variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/Phablo
NODE_ENV=development
```

## Scripts úteis
- `npm run dev` - inicia o servidor em modo development (nodemon)
- `npm run migrate` - aplica migrations (usa migrate-mongo)
- `npm run migrate-down` - reverte a última migration
- `npm run seed` - executa o seed script (Mongoose) para inserir dados iniciais
- `npm run collections` - dropa todas as collections e recria as coleções vazias (`users`, `authors`, `books`, `loans`)


```powershell
npm install
```

4. Rodar migrations (opcional):

```powershell
npm run migrate
```

5. Ou rodar seed direto:

```powershell
npm run seed
```

6. Iniciar a API:

```powershell
npm run dev
```

7. Use o arquivo `routes.http` (VS Code REST Client) ou Postman/curl para testar os endpoints.

## Endpoints principais
- `POST /api/users`
- `GET /api/users`
- `POST /api/authors`
- `GET /api/authors`
- `POST /api/books`
- `GET /api/books`
- `POST /api/loans` - realiza empréstimo (body: `{ userId, bookId }`)
- `GET /api/loans`

## Observações
- O servidor conecta ao MongoDB antes de iniciar e imprime as coleções existentes.
- O seed e a migration criam um `Autor Seed` e um `Livro Seed` como exemplo.