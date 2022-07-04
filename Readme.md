## Technologies used in this project:
* NodeJS V14
* Express framework
* TypeScript
* Docker
* Sequelize ORM (MySQL)
* JWT Authentication
* Swagger
## Aluxion Backend Test
This is a Rest API for a file upload and management website.
Among the services that will have to be performed are:
- Create a user
- Login
- Update a user
- JWT Authentication
- Get list of users paginated
- Registration (With encrypted password)
- Forgot password with email sending.
- File upload (AWS S3)
- Docker support
- Swagger documentation. ( You can find it on route /swagger )

## Database model
<img style="margin: 1px 15px;" src="https://github.com/carlossilvestri/backen_nodejs_aluxion/blob/main/docs/DBModel.png" alt="laughing" width="650" />

## Swagger
<img style="margin: 1px 15px;" src="https://github.com/carlossilvestri/backen_nodejs_aluxion/blob/main/docs/swagger.png" alt="laughing" width="650" />

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 14 was used in this project

Clone the repository
`git clone` command

```console
 git clone <repository_link>
```
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
 npm install
```
Create .env file on the root directory of the project, copy and paste .env.TEMPLATE file.
Set the environment variables.

#### PRODUCTION MODE
Or run the code on production mode
`npm run start` command

```console
  npm run start
```
Or run the code on docker. (Docker is required on your computer)
`docker-compose up` command

```console
  docker-compose up
```
#### DEVELOPMENT MODE
Run code on development mode
`npm run dev` command

```console
  npm run dev
```
## Features

  * Robust routing
  * Focus on high performance
  * Super-high test coverage
  * HTTP helpers (redirection, caching, etc)
  * Content negotiation
  * Executable for generating applications quickly

## Docs

  * This project has swagger on route /swagger


### Running Tests

To run the test suite, first install the dependencies, run the project and then run `npm run test`:

```console
 npm run test
```

To run the test on development mode use command `npm run test:watch`:

```console
 npm run test:watch
```

## License

  [MIT](LICENSE)
