const db = require('../models');

const selectAllCoins = async (options) => {
  let coins;
  if (!options) {
    coins = await db.cacher.model('Coins').findAll();
  } else {
    coins = await db.cacher.model('Coins').findAll({ where: options }); 
  }
  return coins;
};

const selectCoinsByPredicate = async (predicateObject) => {
  const CoinByPredicate = await db.cacher.model('Coins').findOne({ where: predicateObject });
  return CoinByPredicate;
};

const selectCoinsDataByPredicate = async (predicateObject, orderBy = []) => {
  const coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ where: predicateObject, order: orderBy });
  return coinsDataByPredicate;
};

module.exports = {
  selectAllCoins,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
