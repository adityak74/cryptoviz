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

const countAllCoinsDataAndCache = async () => new Promise(async (resolve) => {
  const count = await db
    .sequelize
    .model('CoinsData')
    .count({});
  redisClient.set(COINSDATA_ROWS_COUNT, count, (err, reply) => resolve(reply));
});

const selectAllCoins = async (options = {}) => {
  coins = await db.cacher.model('Coins').findAll({ where: options });
  return coins;
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
  if (!coinsDataByPredicate) {
    coinsDataByPredicateCount = await countAllCoinsData();
    datadogLogger.info('CoinsData: Cache miss');
  } else datadogLogger.info(`CoinsData: Cache hit with row count: ${coinsDataByPredicateCount}`);
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
  selectCoinsDataByPredicate,
  selectCoinsByPredicate,
};
