const async = require('async');
const { sql } = require('../utils');
const { marketTickerAsync } = require('./api-scraper');

const { parallel } = async;

const asyncSelectAllWazirxCoins = cb => {
  const { select } = sql;
  const { selectAllWazirXCoins } = select;
  return selectAllWazirXCoins()
    .then(wazirxCoins => cb(null, wazirxCoins))
    .catch(error => cb(error));
};

const asyncInsertWazirxCoinsData = coinsData => cb => {
  const { insert } = sql;
  const { insertCoinsData } = insert;
  return insertCoinsData(coinsData)
    .then(cb)
    .catch(error => cb(error));
};

const coinsDataSeeder = () => new Promise((resolve, reject) => parallel([
    marketTickerAsync,
    asyncSelectAllWazirxCoins,
  ], async function(err, results) {
    if (err) {
      console.log('err', err);
      reject(err);
    }
    const rawCoinsData = results[0].body;
    const allWazirxCoins = results[1];
    const coins = Object.keys(rawCoinsData);
    const wazirxCoinsData = [];
    coins.forEach(coin => {
      const coinData = rawCoinsData[coin];
      const coinID = allWazirxCoins.find((wazirxCoins) => wazirxCoins.dataValues.name === coinData.name).dataValues.id;
      wazirxCoinsData.push({
        ...coinData,
        coinID,
      });
    });
    const insertAsyncTasks = wazirxCoinsData.map(coinData => asyncInsertWazirxCoinsData(coinData));
    return parallel(insertAsyncTasks, (insertErr, insertResults) => {
      if (insertErr) {
        console.log('Error: Updating database', insertErr);
        reject(insertErr);
      } else {
        console.log('Info: Coins Data Inserted');
        resolve({ coins: wazirxCoinsData });
      }
    });
  }));

module.exports = coinsDataSeeder;
