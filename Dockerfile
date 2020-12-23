FROM node

WORKDIR /app

ENV MONGO_DB_USERNAME=amin \
    MONGO_DB_PASSWORD=amiafu \
    MONGO_DB_HOST=my-mongo-db

COPY ./package.json /app

RUN npm i

COPY . /app

EXPOSE 80

CMD ["node","server.js"]
