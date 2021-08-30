FROM node:14-alpine3.14 AS ui-build

WORKDIR /app

COPY ./ui /app/

RUN yarn install
RUN yarn run build

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7 AS final

RUN pip install aiofiles

WORKDIR /app/

COPY ./api/app /app
COPY --from=ui-build /app/build /www

ENV SERVE_UI=true

EXPOSE 80
