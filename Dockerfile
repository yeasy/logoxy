FROM node:6-slim

MAINTAINER Baohua Yang <yeasy.github.io>
ENV TZ Asia/Shanghai
EXPOSE 8080

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install nodemon -g

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "nodemon" ]

#CMD [ "npm", "start" ]