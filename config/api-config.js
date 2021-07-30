const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path  = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const moment = require('moment');
const coinsDataSeeder = require('../services/wazirx/coinsData-seeder');
const { sql } = require('../utils');

if (!process.env.GCP_PROJECT) {
  dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`) });
}
 
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
  res.sendFile(path.join(__dirname, '..', 'documents', 'index.html'));
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

app.get('/coins', async (req, res) => {
  const { select } = sql;
  const { selectAllWazirXCoins } = select;
  try {
    const coinsData = await selectAllWazirXCoins();
    res.send({
      success: true,
      coins: coinsData.length,
      coinsData,
    });
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
});

module.exports = {
  app: app
};
