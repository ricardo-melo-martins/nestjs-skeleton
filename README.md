<div align="right">

### ⚡ RMM ⚡

</div>

# NestJs Skeleton

Standard and basic structure to assist in the quick start of tests, projects, pocs with this technology.

`*pt-br` Estrutura padrão e básica para auxiliar no início rápido de testes, projetos, pocs com esta tecnologia.

## Description

Structure was based on <br>
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. 

<table>
  <tr>
    <td>
      <p align="center">
        <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="60" alt="Nest Logo" /></a>
      </p>
    </td>
    <td>
      <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    </td>
  </tr>
</table>

## Features

- Modular Structure
- Defines for Style and Linting (ESLint, Prettier, EditorConfig)


## Requirements

- Node > 18.x
- Database (Mysql, Postgres)
- Docker > 18.06 (Optional)
    - For testing I using https://github.com/ricardo-melo-martins/docker


## Installation

Cloning

```bash
git clone https://github.com/ricardo-melo-martins/nestjs-skeleton.git
```

... entering on nestjs-skeleton dir


```bash

cd nestjs-skeleton

composer install


# make it yours (optional)
rm -rf .git

```

## Configure

Copy example environment

```bash

cp ./config/.env.example .env

```

then change the configuration according to the database you want to use.

### Database

```bash

DATABASE_DEFAULT_TYPE=mysql
DATABASE_DEFAULT_HOST=127.0.0.1
DATABASE_DEFAULT_PORT=3306
DATABASE_DEFAULT_DATABASE=my_database
DATABASE_DEFAULT_USERNAME=root
DATABASE_DEFAULT_PASSWORD=YourP@ssw0rd!

```


## Running the app

```bash

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

## Test

```bash

# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

```


## License

Nest is [MIT licensed](LICENSE).
