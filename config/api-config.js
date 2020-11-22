var express = require("express");
var app = express();
var path  = require('path');
var bodyParser = require('body-parser');
const forever = require('forever');
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

app.post('/startCoinsSeeder', (req, res) => {
  coinsDataSeeder().then(() => {
    return res.send({
      seeder: 'started',
      success: true,
    });
  }).catch((error) => {
    return res.send({
      seeder: 'failed',
      error,
      success: false,
    });
  });
});

app.post('/stopCoinsSeeder', (req, res) => {
  return res.send({
    seeder: 'stopped',
    success: true,
  });
});

module.exports = {
  app: app
};
