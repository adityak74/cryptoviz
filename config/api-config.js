var express = require("express");
var app = express();
var path  = require('path');
var bodyParser = require('body-parser');
const forever = require('forever');

const runnerPath = path.join(__dirname, '..', 'utils', 'runners', 'coinsData-runner.js');
 
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
  res.send('WazirX Visualizer V0.1');
});

app.post('/startCoinsSeeder', (req, res) => {
  forever.startDaemon(runnerPath, {
    env: { 'NODE_ENV': 'staging' },
    max : 1,
    silent : true
  });
  return res.send({
    seeder: 'started',
    success: true,
  });
});

app.post('/stopCoinsSeeder', (req, res) => {
  forever.stopAll();
  return res.send({
    seeder: 'stopped',
    success: true,
  });
});

module.exports = {
  app: app
};
