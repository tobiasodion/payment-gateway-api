
FROM node:14

WORKDIR /backend

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]