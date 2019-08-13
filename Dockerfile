FROM node:12-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install --silent

EXPOSE 8888

CMD ["npm", "start"]
