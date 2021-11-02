const sqlInsertUtils = require('./sql-insert');
const sqlSelectUtils = require('./sql-select');
const redisClient = require('./redis');

module.exports = {
  sql: {
    insert: sqlInsertUtils,
    select: sqlSelectUtils,
  },
  redis: {
    client: redisClient,
  },
};
