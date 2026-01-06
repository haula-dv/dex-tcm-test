FROM node:18 AS builder

# Cài đặt Git và pnpm
RUN apt-get update && apt-get install -y git
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:18-slim

RUN apt-get update && apt-get install -y git
RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/.next/ /app/public/ /app/node_modules/ ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
