var express = require("express");
var app = express();
var path  = require('path');
var bodyParser = require('body-parser');
const coinsDataSeeder = require('../services/coinsData-seeder');

const packageJSON = require('../package.json');
 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// index route
app.get('/', (req, res) => {
  res.send(`WazirX Visualizer v${packageJSON.version}`);
});

app.post('/seedCoinsData', (req, res) => {
  coinsDataSeeder().then((coinsDataPayload) => {
    return res.send({
      seeder: 'complete',
      success: true,
      coinsDataPayload,
    });
  }).catch((error) => {
    return res.send({
      seeder: 'failed',
      error,
      success: false,
    });
  });
});

module.exports = {
  app: app
};
