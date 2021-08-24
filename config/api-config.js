const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path  = require('path');
const bodyParser = require('body-parser');
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
  console.log('Seeding coins data...');
  return coinsDataSeeder().then((coinsDataPayload) => {
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
  const { selectAllCoins } = select;
  try {
    const coinsData = await selectAllCoins();
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

app.get('/coinsData', async (req, res) => {
  const { select } = sql;
  const { selectCoinsDataByPredicate } = select;
  const page = req.query.page || 1;
  try {
    const coinsData = await selectCoinsDataByPredicate(page);
    res.send({
      success: true,
      rows: coinsData.rows.length,
      totalPages: Math.ceil(coinsData.count / coinsData.rows.length),
      page,
      coinsData: coinsData.rows,
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
