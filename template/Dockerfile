FROM node:20-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]