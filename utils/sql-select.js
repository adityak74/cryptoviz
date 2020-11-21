const db = require('../models');

const selectAllWazirXCoins = async () => {
  const allWazirxCoins = await db.WazirXCoins.findAll();
  return allWazirxCoins;
};

module.exports = {
  selectAllWazirXCoins,
};
