FROM node:20.11.1-alpine3.19 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "./dist/server.js"]