const cron = require('node-cron');

const seederFunction = require('../../services/wazirx/coinsData-seeder');

cron.schedule('*/1 * * * *', async () => {
  console.log('Updating database with coins data');
  await seederFunction();
});
