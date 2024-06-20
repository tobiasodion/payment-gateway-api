
FROM node:20-alpine

WORKDIR /frontend

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "dist"]
