FROM python:3-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY poetry.lock pyproject.toml ./
RUN pip install poetry==1.1
RUN poetry config virtualenvs.in-project true && \
    poetry install --no-dev

COPY . ./

EXPOSE 8000

CMD poetry run uvicorn --host=0.0.0.0 app.main:app