FROM node:14

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

RUN npm build

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "serve" , "-s", "build", "-p", "8080"]