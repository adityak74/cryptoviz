const db = require('../models');

const insertCoin = async (coin) => {
  const { exchange, name, quote_unit, base_unit } = coin;
  const insertedCoin = await db.Coins.create({ name, exchange, unit: quote_unit, base_unit });
  return insertedCoin.dataValues.id;
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
  insertCoin,
  insertCoinsData,
};
