FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . . 

EXPOSE 3000

CMD ["node", "dist/main"]