FROM node:current-stretch-slim

# Bundle APP files
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
# RUN node_modules/.bin/tsc

CMD [ "npm", "run" , "deploy" ]