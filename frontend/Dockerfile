FROM node:14

#USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN ls

RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . .

RUN npm run-script build
#COPY ./build ./build_src

#RUN mv ./build_src ./build && chmod -R 777 ./build

EXPOSE 8080

CMD [ "serve" , "-d", "-s", "build", "-p", "8080"]