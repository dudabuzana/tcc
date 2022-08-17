FROM node:12-alpine as base

FROM base as dev
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app
EXPOSE 5050
RUN yarn install
RUN yarn prisma generate
RUN yarn prisma migrate dev
RUN yarn prisma seed
RUN yarn build
