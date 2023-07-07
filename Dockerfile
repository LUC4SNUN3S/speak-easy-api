FROM node:16.14.2-alpine

WORKDIR /home/node/app

ENV NODE_ENV development
ENV TZ America/Fortaleza
ENV PATH_STORAGE /home/node/storage

RUN npm install -g @nestjs/cli
RUN mkdir /home/node/storage && chown node:node -Rf /home/node/storage
RUN apk add --no-cache \
  yarn \
  tzdata \
  && yarn cache clean --all

CMD [ "yarn", "start:dev" ]