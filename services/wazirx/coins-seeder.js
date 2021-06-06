const async = require('async');
const { sql } = require('../../utils');
const { marketTickerAsync } = require('./api-scraper');

async.parallel([
  marketTickerAsync,
], function(err, results) {
  if (err) console.log('err', err);
  const { insert } = sql;
  const { insertCoin } = insert;
  const rawCoinsData = results[0].body;
  const coins = Object.keys(rawCoinsData);
  const coinsToInsert = [];
  coins.forEach(coin => {
    const coinData = rawCoinsData[coin];
    coinsToInsert.push({ ...coinData, exchange: 'WAZIRX' });
  });
  coinsToInsert.map(insertCoin);
});
