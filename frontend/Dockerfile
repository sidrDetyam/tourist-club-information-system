FROM node:18-alpine
WORKDIR /front
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start"]