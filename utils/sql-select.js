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

const selectCoinsDataByPredicate = async (predicateObject = {}, orderBy = []) => {
  let coinsDataByPredicate;
  let orderByOptions = orderBy || [['updatedAt', 'DESC']];
  if (!predicateObject) {
    coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ order: orderByOptions }); 
  } else {
    coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ where: predicateObject, order: orderByOptions });
  }
  return coinsDataByPredicate;
};

module.exports = {
  selectAllCoins,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
