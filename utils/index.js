const sqlInsertUtils = require('./sql-insert');
const sqlSelectUtils = require('./sql-select');

module.exports = {
  sql: {
    insert: sqlInsertUtils,
    select: sqlSelectUtils,
  },
};
