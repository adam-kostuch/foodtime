FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN sed -i "s/mongodb:\/\/localhost/mongodb:\/\/mongo/g" src/common/services/mongoose.service.js

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]
