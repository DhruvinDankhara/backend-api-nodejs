## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisite

- create `.env` file based on your environment like,
  - for development server > `.development.env`
  - for staging server > `.stage.env`
  - for production server > `.production.env`

- For more information, refer `.example.env` file.
- If you're running it with `docker-compose` you need to change database port to `5431`.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# build
$ npm start

# development
$ npm run dev

# staging
$ npm run stage

# production mode
$ npm run prod
```

## Building
```bash
npm run build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Console
this is command service to run database commands like create, run, down migration.
```bash
# development
$ npm run console:dev db 

# staging
$ npm run console:stage db 

# production 
$ npm run console:prod db
```

### Database commands

- `db migrate:create <name>` - to create empty migration file.
- `db migrate:up` - to run all migration.
- `db migrate:down` - to run migration one down.


### Swagger Documentation

- Swagger documentation endpoint will be running at `http://host:port/docs`.
- Create dtos payload accordingly for well maintained API documentation. 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
