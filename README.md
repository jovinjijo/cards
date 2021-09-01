# Cards

React application that demonstrates user interactions on Cards like drag and drop. It uses FastAPI for the backend for serving the data rendered in the UI.

## Features

 - Displays a set of cards in the UI
 - Data is fetched from the backend
 - Cards can be reordered by drag and drop
 - Dialog box to show details of the card on click
 - Spinner while image is loading on the card

## Components
 - Frontend built on React
 - Backend built on FastAPI
 - Database - PostgreSQL
### Frontend

Frontend is built on React using [create-react-app](https://create-react-app.dev/).

#### Assumptions

 - Since this is a small application, Redux is not used.

### Backend

Backend is built using FastAPI. It can use either PostgreSQL or SQLite as it's database. There is only one resource for CRUD operations on Card

[More Details](./api/README.md)

### Database

PostgreSQL is used as the Database. pgAdmin is also provided in the [docker-compose](./docker-compose.yaml) file for viewing the DB data

## How to run

For demoing the application, it can be run by installing Docker and running

```sh
docker-compose up -d
```

For development, the application can be run as follows

 - Install Python 3 and Node.js
 - Install poetry

```sh
pip install poetry
```

 - Go to ```api``` folder and initialize it and run it by,

```sh
cd api
poetry install
poetry run uvicorn app.main:app --reload
```

 - Install yarn

```sh
npm install -g yarn
```

 - In an other terminal, initialize and run UI by,

```sh
cd ui
yarn install
yarn start
```

 - The above steps will run the application using SQLite. If you want to use PostgreSQL, give the URL of the running instance in an environment variable like this for Linux/Mac

```sh
export DATABASE_URL=postgresql://<username>:<password>@<host>/<databasename>
```
