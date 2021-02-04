FROM node:14

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

RUN npm build

# Bundle app source
COPY . .
COPY .\build .\build_src

RUN mv /build_src /build && chmod -R 777 /build

EXPOSE 8080

CMD [ "serve" , "-d", "-s", "build", "-p", "8080"]