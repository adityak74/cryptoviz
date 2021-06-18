const net = require("net");
const questDBInfluxConfig = require('../config/config.json').questDBInflux;

const client = new net.Socket()

const { host, port } = questDBInfluxConfig;

function run() {
  client.connect(port, host, () => {
    console.log("Connected")
    process.exit()
  })
}

run()
