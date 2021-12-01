const db = require('../models');
const { redisClient } = require('./redis');
const { promisify } = require('util');
const { SQL_ROWS_PER_PAGE } = require('../constants/sql');
const datadogLogger = require('../utils/logger');

const COINSDATA_ROWS_COUNT = "COINSDATA_ROWS_COUNT";

const countAllCoinsData = async () => {
  const count = await db
    .sequelize
    .model('CoinsData')
    .count({});
  datadogLogger.info(`CoinsData: Cache populated with total row count: ${count}`);
  return count;
};

const countAllCoinsDataAndCache = async () => {
  const count = await db
    .sequelize
    .model('CoinsData')
    .count({});
  redisClient.set(COINSDATA_ROWS_COUNT, count);
};

const selectAllCoins = async (options = {}) => {
  const coins = await db.cacher.model('Coins').findAll({ where: options });
  return coins;
};

const selectAllExchanges = async (options = {}) => {
  const exchanges = await db.cacher.model('Exchanges').findAll({ where: options });
  return exchanges;
};

const selectCoinsByPredicate = async (predicateObject) => {
  const CoinByPredicate = await db.cacher.model('Coins').findOne({ where: predicateObject });
  return CoinByPredicate;
};

const selectCoinsDataByPredicate = async (page = 1, predicateObject = {}, orderBy = []) => {
  let coinsDataByPredicate;
  let orderByOptions = orderBy || [['updatedAt', 'DESC']];
  const limit = SQL_ROWS_PER_PAGE;
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
  let coinsDataByPredicateCount = null;
  coinsDataByPredicateCount = await redisGetPromise(COINSDATA_ROWS_COUNT);
  datadogLogger.info(`CoinsData: Cache hit with row count: ${coinsDataByPredicateCount}`);
  if (!coinsDataByPredicate) {
    coinsDataByPredicateCount = await countAllCoinsData();
    datadogLogger.info('CoinsData: Cache miss');
  }
  coinsDataByPredicate = await db
    .cacher
    .model('CoinsData')
    .findAll({ ...queryOptions, ...options });
  return { rows: coinsDataByPredicate, count: Number(coinsDataByPredicateCount) };
};

module.exports = {
  countAllCoinsData,
  countAllCoinsDataAndCache,
  selectAllCoins,
  selectAllExchanges,
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
