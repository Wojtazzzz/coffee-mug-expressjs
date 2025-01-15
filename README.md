# M&M Consulting - recruitment task

## Main tools

- JavaScript, TypeScript
- Express.js
- MongoDB
- Docker

## Requirements

1. Node
2. Docker

## Installation

Run the following commands:

1. Clone repository

```sh
gh repo clone Wojtazzzz/express-crud && cd express-crud
```

2. Setup env variables

```sh
cp .env.example .env
```

3. Run mongo in docker

```sh
docker compose up -d
```

4. Run Express server

```sh
npm run dev
```

5. App is available at http://localhost:3000/

You can browse following endpoints:
\
`GET /products`
\
`POST /products`
\
`POST /products/:id/restock`
\
`POST /products/:id/sell`
\
`POST /orders`
