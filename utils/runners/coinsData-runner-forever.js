const forever = require('forever');
const path = require('path');

const runnerPath = path.join(__dirname, 'coinsData-runner.js');

forever.startDaemon(runnerPath, {
  env: { 'NODE_ENV': 'production' },
  max : 1,
  silent : true
});
