FROM node:20-alpine as build

WORKDIR /app
COPY src ./src
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install -g @nestjs/cli
RUN npm ci --only=production && npm cache clean --force
RUN npm run build


FROM node:20-alpine  as Production

ENV NODE_ENV production
WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./
COPY ecosystem.config.production.js ./ecosystem.config.js
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["pm2-runtime" "start" "ecosystem.config.js"]
