const async = require('async');
const { sql } = require('../../utils');
const { marketTickerAsync } = require('./api-scraper');

const { parallel } = async;

const asyncSelectAllWazirxCoins = cb => {
  const { select } = sql;
  const { selectAllCoins } = select;
  return selectAllCoins({ exchange: 'wazirx' })
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

// create a map of coin names to coin data for easy lookup
const storedCoinMap = {};

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
    const rawCoinsDataMapped = Object.keys(rawCoinsData).map(key => rawCoinsData[key]);
    for (let k = 0; k < results[1].length; k++) {
      const coin = results[1][k];
      // if the data is returned from SQL layer it will be coin.dataValues
      // otherwise if the redis layer cached the data it will be coin itself
      storedCoinMap[coin.name || coin.dataValues.name] = coin.dataValues;
    }
    const wazirxCoinsData = [];
    for (let i = 0; i < rawCoinsDataMapped.length; i++) {
      const coinName = rawCoinsDataMapped[i].name;
      const coinForID = storedCoinMap[coinName] || null;
      let coinID;
      // if not found here then we will need to insert this new coin and get the ID
      // and then proceed with inserting the data
      if (!coinForID) {
        coinID = await insertCoin({ ...rawCoinsDataMapped[i], exchange: 'wazirx' });
      } else {
        coinID = coinForID.id;
      }
      wazirxCoinsData.push({
        ...rawCoinsDataMapped[i],
        coinID,
      });
    }
    const insertAsyncTasks = wazirxCoinsData.map(coinData => asyncInsertWazirxCoinsData(coinData));
    return parallel(insertAsyncTasks, (insertErr, insertResults) => {
      if (insertErr) {
        console.log('Error: Updating database', insertErr);
        return reject(insertErr);
      } else {
        return resolve({ coins: wazirxCoinsData });
      }
    });
  }));

module.exports = coinsDataSeeder;
