const db = require('../models');

const selectAllWazirXCoins = async () => {
  const allWazirxCoins = await db.WazirXCoins.findAll();
  return allWazirxCoins;
};

const selectWazirXCoinsByPredicate = async (predicateObject) => {
  const wazirxCoinByPredicate = await db.WazirXCoins.findOne({ where: predicateObject });
  return wazirxCoinByPredicate;
};

const selectCoinsDataByPredicate = async (predicateObject, orderBy = []) => {
  const coinsDataByPredicate = await db.CoinsData.findAll({ where: predicateObject, order: orderBy });
  return coinsDataByPredicate;
};

module.exports = {
  selectAllWazirXCoins,
  selectCoinsDataByPredicate,
  selectWazirXCoinsByPredicate,
};
