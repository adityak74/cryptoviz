const async = require('async');
const { sql } = require('../utils');
const { marketTickerAsync } = require('./api-scraper');

async.parallel([
  marketTickerAsync,
], function(err, results) {
  if (err) console.log('err', err);
  const { insert } = sql;
  const { insertWazirXCoin } = insert;
  const rawCoinsData = results[0].body;
  const coins = Object.keys(rawCoinsData);
  const wazirxCoins = [];
  coins.forEach(coin => {
    const coinData = rawCoinsData[coin];
    wazirxCoins.push(coinData);
  });
  wazirxCoins.map(insertWazirXCoin);
});
