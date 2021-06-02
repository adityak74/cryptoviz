const db = require('../models');

const selectAllCoins = async () => {
  const allCoins = await db.cacher.model('Coins').findAll();
  return allCoins;
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
