FROM node:alpine AS base

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install -g pnpm  

RUN pnpm install

COPY . .

EXPOSE 3000


FROM base AS development

CMD ["pnpm","start:dev"]


FROM base AS production

CMD ["pnpm","start"]



