FROM node:8.12.0-alpine



RUN mkdir -p /dito
WORKDIR /dito

COPY test /dito/test
COPY src /dito/src 
COPY package.json package-lock.json server.js server.js .babelrc ./
# ADD package.json \
#     package-lock.json \
#     server.js \
#     .babelrc .
# ADD package-lock.json .
# ADD server.js .
# ADD .babelrc .

RUN set -ex && \
    npm install --no-cache-dir

