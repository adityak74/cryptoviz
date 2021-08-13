const cron = require('node-cron');
const superagent = require('superagent');

cron.schedule('*/1 * * * *', () => {
  console.log('Updating database with coins data');
  return superagent.post('http://localhost:3001/seedCoinsData').end(async (err, res) => {
    if (err) {
        console.log(err)
      } else {
        console.log('Coins data updated')
      }
  });
});
