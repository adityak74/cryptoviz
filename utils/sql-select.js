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
  const queryOptions = {
    order: orderByOptions,
  };
  if (predicateObject) queryOptions.where = predicateObject;
  coinsDataByPredicateCount = await db
    .cacher
    .model('CoinsData')
    .count(queryOptions);
  coinsDataByPredicate = await db
    .cacher
    .model('CoinsData')
    .findAll({ ...queryOptions, ...options });
  return { rows: coinsDataByPredicate, count: coinsDataByPredicateCount };
};

module.exports = {
  selectAllCoins,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
