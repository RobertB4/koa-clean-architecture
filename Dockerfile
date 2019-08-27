FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production
RUN npm install pm2 -g

COPY ./build .
COPY ./ecosystem.config.js .

CMD [ "pm2-runtime", "ecosystem.config.js" ]