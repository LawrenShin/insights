FROM node:14

ARG HOST

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . .

RUN echo REACT_APP_HOST='$HOST' > ./.env

RUN cat ./.env

RUN npm run-script build:production

EXPOSE 8080

CMD [ "serve" , "-d", "-s", "build", "-p", "8080"]