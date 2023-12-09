FROM node:21.2.0-alpine

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install --production

COPY . .
