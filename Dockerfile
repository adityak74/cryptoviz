FROM mhart/alpine-node:12

WORKDIR /app
RUN apk add --no-cache make gcc g++ python3
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "node", "app.js" ]
