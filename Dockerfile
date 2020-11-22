FROM node:14

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8088
CMD [ "NODE_ENV=staging", "node", "app.js" ]
