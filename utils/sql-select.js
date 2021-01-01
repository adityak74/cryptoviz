const db = require('../models');

const selectAllWazirXCoins = async () => {
  const allWazirxCoins = await db.cacher.model('WazirXCoins').findAll();
  console.log('selectAllWazirXCoins-->>', selectAllWazirXCoins);
  return allWazirxCoins;
};

const selectWazirXCoinsByPredicate = async (predicateObject) => {
  const wazirxCoinByPredicate = await db.cacher.model('WazirXCoins').findOne({ where: predicateObject });
  return wazirxCoinByPredicate;
};

const selectCoinsDataByPredicate = async (predicateObject, orderBy = []) => {
  const coinsDataByPredicate = await db.cacher.model('CoinsData').findAll({ where: predicateObject, order: orderBy });
  return coinsDataByPredicate;
};

module.exports = {
  selectAllWazirXCoins,
  selectCoinsDataByPredicate,
  selectWazirXCoinsByPredicate,
};
