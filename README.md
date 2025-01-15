# Coffee Mug - recruitment task

## Main tools

- JavaScript, TypeScript
- Express.js
- MongoDB
- Docker

## Requirements

1. Node v22
2. Docker

## Installation

Run the following commands:

1. Clone repository

```sh
git clone https://github.com/Wojtazzzz/coffee-mug-expressjs.git coffee-mug-expressjs && cd coffee-mug-expressjs
```

2. Setup env variables

```sh
cp .env.example .env
```

3. Install dependencies

```sh
npm i
```

4. Run mongo in the Docker container

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
