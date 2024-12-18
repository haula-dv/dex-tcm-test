FROM node:18 AS builder

# Cài đặt Git
RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-slim

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock /app/.next/ /app/public/ /app/node_modules/ ./

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
