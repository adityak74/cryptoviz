const cron = require('node-cron');
const path = require('path');
const shell = require('shelljs');

const seederPath = path.join(`${__dirname}`, '..', '..', 'services', 'coinsData-seeder.js');
 
cron.schedule('*/5 * * * *', () => {
  console.log('Updating database with coins data');
  if (shell.exec(`node ${seederPath}`).code !== 0) {
    shell.echo('Error: Running coins data seeder');
    shell.exit(1);
  } else {
    shell.echo('Info: Running coins data seeder complete');
  }
});
