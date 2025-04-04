FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm
RUN apk add file

COPY package.json ./pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev:docker"]
