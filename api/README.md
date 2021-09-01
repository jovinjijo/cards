# Backend

Backend is built using FastAPI. It can use either PostgreSQL or SQLite as it's database. There is only one resource for CRUD operations on Card. For deployment, the source code is packaged into a [Dockerfile](./Dockerfile) and run.

## Entities

### Card

Card is the only entity that is used in this project. It stores the following data
 - title : string
 - position : integer
 - type : string

```position``` determines which index will the card be shown. It also has a unique constraint, so that no two cards have the same position.

More details [here](./app/models/models.py)

## Features
 - Create Cards
 - Retrieve Cards
 - Update Cards

Further features like removing cards can also be added by simply creating a new method [here](./app/db/crud.py), using the db object to query the card with the id and remove it. A handler can be added for the DELETE request on /api/cards/{id} [here](./app/routes/cards.py)

## Frameworks used
 - FastAPI as Web Framework
 - SQLAlchemy as ORM
 - Pydantic for models and schemas
 - Poetry for dependency management
 - Uvicorn as ASGI Web Server