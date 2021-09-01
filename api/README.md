# Backend

Backend is built using FastAPI. It can use either PostgreSQL or SQLite as it's database. There is only one resource for CRUD operations on Card. For deployment, the source code is packaged into a [Dockerfile](./Dockerfile) and run.

## Features
 - Create Cards
 - Retrieve Cards

## Frameworks used
 - FastAPI as Web Framework
 - SQLAlchemy as ORM
 - Pydantic for models and schemas
 - Poetry for dependency management
 - Uvicorn as ASGI Web Server