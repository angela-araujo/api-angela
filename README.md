# API Angela

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Rotas

[Postam Collection](https://github.com/angela-araujo/api-angela/blob/master/postman_collection.json)

#### Criar usuário

```http
  POST /api/v1/person
```


#### Criar task

```http
  POST /api/v1/task
```

#### Delegar task ou Finalizar task

```http
  PATCH /api/v1/task/:id
```

#### Listar tasks por usuário

```http
  GET /api/v1/task/person/:id
```

#### Listar todas as tasks

```http
  GET /api/v1/task
```


## License

Nest is [MIT licensed](LICENSE).
