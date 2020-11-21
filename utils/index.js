const MimeNode = require('nodemailer/lib/mime-node');
const sqlInsertUtils = require('./sql-insert');
const sqlSelectUtils = require('./sql-select');

module.exports = {
  sql: {
    insert: sqlInsertUtils,
    select: sqlSelectUtils,
  },
};
