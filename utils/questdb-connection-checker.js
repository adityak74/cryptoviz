const { Client } = require("pg");
const questDBConfig = require('../config/config.json').questDB;

const start = async () => {
  const client = new Client({
    ...questDBConfig,
  })
  await client.connect()
  console.log("Connected", client)
  process.exit();
}

start()
