const db = require('../models');
const { redisClient } = require('./redis');
const { promisify } = require('util');

const COINSDATA_ROWS_COUNT = "COINSDATA_ROWS_COUNT";

const countAllCoinsDataAndCache = async () => {
  const count = await db
    .cacher
    .model('CoinsData')
    .count({});
  redisClient.set(COINSDATA_ROWS_COUNT, count);
};

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
  const redisGetPromise = promisify(redisClient.get).bind(redisClient);
  coinsDataByPredicateCount = await redisGetPromise(COINSDATA_ROWS_COUNT);
  coinsDataByPredicate = await db
    .cacher
    .model('CoinsData')
    .findAll({ ...queryOptions, ...options });
  return { rows: coinsDataByPredicate, count: coinsDataByPredicateCount };
};

module.exports = {
  countAllCoinsDataAndCache,
  selectAllCoins,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
