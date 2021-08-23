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

const selectCoinsDataByPredicate = async (page = 1, predicateObject = {}, orderBy = []) => {
  let coinsDataByPredicate;
  let orderByOptions = orderBy || [['updatedAt', 'DESC']];
  const limit = 1000;
  const offset = (page - 1) * limit;
  const options = {
    limit,
    offset,
  };
  if (!predicateObject) {
    coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ order: orderByOptions, ...options });
  } else {
    coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ where: predicateObject, order: orderByOptions, ...options });
  }
  return coinsDataByPredicate;
};

module.exports = {
  selectAllCoins,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
