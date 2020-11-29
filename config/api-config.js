const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path  = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const moment = require('moment');
const coinsDataSeeder = require('../services/coinsData-seeder');
const { sql } = require('../utils');

if (!process.env.GCP_PROJECT) {
  dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`) });
}

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  WHATSAPP_FROM,
  WHATSAPP_TO,
} = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

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

const formattedCoinsDataMessage = (coin, coinData) => 
  `Coin ${coin.name} values at a high of ${coinData.high} and low of ${coinData.low} at ${moment(coinData.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`;

const notifyUserForCoin = (coinBaseUnit, res) => {
  const { select } = sql;
  const { selectWazirXCoinsByPredicate, selectCoinsDataByPredicate } = select;
  selectWazirXCoinsByPredicate({ base_unit: coinBaseUnit })
    .then((record) => {
      const wazirxCoin = record.dataValues;
      selectCoinsDataByPredicate({ coinID: wazirxCoin.id }, [[ 'createdAt', 'DESC' ]])
        .then((coinRecord) => {
          const latestCoinPrice = coinRecord[0].dataValues;
          client.messages
            .create({
              body: formattedCoinsDataMessage(wazirxCoin, latestCoinPrice),
              from: WHATSAPP_FROM,
              to: WHATSAPP_TO
            })
            .then(message => res.send({
                messageId: message.sid,
                success: true,
              }))
            .done();
        });
    });
};

app.post('/notifyUser', (req, res) => {
  notifyUserForCoin('link', res);
});

module.exports = {
  app: app
};
