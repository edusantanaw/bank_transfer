FROM node:18-alpine
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 80
CMD ['yarn', "start"]