# Cache yarn install so that this is not done everytime source code is changed
FROM node:14-alpine3.14 AS yarn-install

WORKDIR /app

COPY ./package.json ./yarn.lock /app/

RUN yarn install

# Copy source code and run yarn build where yarn install is already done
FROM yarn-install AS yarn-build

COPY . /app/
RUN yarn run build

# NGINX is used to serve the static html files, while proxying requests to /api/* to API_HOST:API_PORT
FROM nginx AS final

COPY --from=yarn-build /app/build /usr/share/nginx/html

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

ENV API_HOST=backend
ENV API_PORT=8000
