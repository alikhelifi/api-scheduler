FROM node:lts

WORKDIR /app

COPY package.json ./

RUN npm install pm2 -g

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001
RUN pwd && ls -al

CMD ["pm2-runtime", "start", "dist/main.js"]
