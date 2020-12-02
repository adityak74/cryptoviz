const db = require('../models');

const insertWazirXCoin = async (wazixCoin) => {
  const { name, quote_unit, base_unit } = wazixCoin;
  const insertedWazirXCoin = await db.WazirXCoins.create({ name, unit: quote_unit, base_unit });
  return insertedWazirXCoin.dataValues.id;
};

const insertCoinsData = async (coinsData) => {
  const {
    coinID,
    low,
    high,
    last,
    open,
    volume,
    sell,
    buy,
    type,
  } = coinsData;
  await db.CoinsData.create({
    coinID,
    low: parseFloat(low),
    high: parseFloat(high),
    last: parseFloat(last),
    volume: parseFloat(volume),
    sell: parseFloat(sell),
    buy: parseFloat(buy),
    open,
    tickerType: type,
  });
};

module.exports = {
  insertCoinsData,
  insertWazirXCoin,
};
