const async = require('async');
const { sql } = require('../../utils');
const { marketTickerAsync } = require('./api-scraper');

const { parallel } = async;

const asyncSelectAllWazirxCoins = cb => {
  const { select } = sql;
  const { selectAllCoins } = select;
  return selectAllCoins()
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
      return reject(err);
    }
    const { insert } = sql;
    const { insertCoin } = insert;
    const rawCoinsData = results[0].body;
    const allWazirxCoins = results[1];
    const coins = Object.keys(rawCoinsData);
    const wazirxCoinsData = [];
    for (let i = 0; i < coins.length; i++) {
      const coinData = rawCoinsData[coins[i]];
      const coinForID = allWazirxCoins.find((wazirxCoins) => wazirxCoins.dataValues.name === coinData.name);
      let coinID;
      // if not found here then we will need to insert this new coin and get the ID
      // and then proceed with inserting the data
      if (!coinForID) {
        coinID = await insertCoin({ ...coinData, exchange: 'wazirx' });
      } else { 
        coinID = coinForID.dataValues.id;
      }
      wazirxCoinsData.push({
        ...coinData,
        coinID,
      });
    }
    console.log('wazirxCoinsData', wazirxCoinsData);
    const insertAsyncTasks = wazirxCoinsData.map(coinData => asyncInsertWazirxCoinsData(coinData));
    return parallel(insertAsyncTasks, (insertErr, insertResults) => {
      if (insertErr) {
        console.log('Error: Updating database', insertErr);
        return reject(insertErr);
      } else {
        console.log('Info: Coins Data Inserted');
        return resolve({ coins: wazirxCoinsData });
      }
    });
  }));

module.exports = coinsDataSeeder;
