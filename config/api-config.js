const express = require('express');
const app = express();
const cors = require('cors');
const path  = require('path');
const bodyParser = require('body-parser');
const { interval } = require('rxjs');
const coinsDataSeeder = require('../services/wazirx/coinsData-seeder');
const {
  SQL_ROWS_PER_PAGE,
  SQL_UPDATE_COINDSDATA_COUNT_IN_CACHE_INTERVAL
} = require('../constants/sql');
const { sql } = require('../utils');
const datadogLogger = require('../utils/logger');

const source = interval(SQL_UPDATE_COINDSDATA_COUNT_IN_CACHE_INTERVAL);
const subscription = source.subscribe(async _ => {
  const { select } = sql;
  const { countAllCoinsDataAndCache } = select;
  datadogLogger.info(`CoinsData: Updater service populating cache`);
  await countAllCoinsDataAndCache();
});

process.on('exit', () => {
  subscription.unsubscribe();
});

app.use(cors());
app.logger = datadogLogger;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json({
  strict: false,
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('User Agent', req.headers['user-agent'], "IP: ", req.ip);
  next();
});

// index route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'documents', 'index.html'));
});

app.post('/seedCoinsData', (req, res) => {
  console.log('Seeding coins data...');
  return coinsDataSeeder().then((coinsDataPayload) => {
    return res.send({
      seeder: 'complete',
      success: true,
      coinsDataPayload,
    });
  }).catch((error) => {
    return res.send({
      seeder: 'failed',
      error,
      success: false,
    });
  });
});

app.get('/coins', async (req, res) => {
  const { select } = sql;
  const { selectAllCoins } = select;
  try {
    const coinsData = await selectAllCoins();
    res.send({
      success: true,
      coins: coinsData.length,
      coinsData,
    });
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
});

app.get('/exchanges', async (req, res) => {
  const { select } = sql;
  const { selectAllExchanges } = select;
  try {
    const exchangesData = await selectAllExchanges();
    res.send({
      success: true,
      exchanges: exchangesData.length,
      exchangesData,
    });
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
});

app.get('/coinsData', async (req, res) => {
  const handleFailure = (statusCode, error) => {
    const errorObj = {
      success: false,
    };
    const errorFormattedObj = typeof error === 'string' ? { ...errorObj, 'error': error } : { ...errorObj, error };
    return res.status(statusCode).send(errorFormattedObj);
  };
  
  const { select } = sql;
  const { selectCoinsDataByPredicate } = select;
  let pageNumber = req.query.page || 1;
  let page = Number(pageNumber);
  if (!page || page <= 0) return handleFailure(500, "invalid page number");
  try {
    const coinsData = await selectCoinsDataByPredicate(page);
    const { rows } = coinsData;
    const totalPages = Math.ceil(coinsData.count / SQL_ROWS_PER_PAGE);
    if (page > totalPages) {
      console.log("Page: ", page, "Total Pages: ", totalPages, "Coins Data: ", coinsData);
      return handleFailure(400, "page number exceeded");
    }
    return res.send({
      success: true,
      rows: rows.length,
      totalRows: coinsData.count,
      totalPages,
      page,
      coinsData: rows,
    });
  } catch (error) {
    return handleFailure(500, error);
  }
});

app.get('/countCoinsData', async (req, res) => {
  const handleFailure = (statusCode, error) => {
    const errorObj = {
      success: false,
    };
    const errorFormattedObj = typeof error === 'string' ? { ...errorObj, 'error': error } : { ...errorObj, error };
    return res.status(statusCode).send(errorFormattedObj);
  };

  const { select } = sql;
  const { countAllCoinsData } = select;
  try {
    const startTime = new Date();
    const rowsCount = await countAllCoinsData();
    const timeElapsed = `${(new Date() - startTime) / 1000} seconds`;
    return res.send({
      success: true,
      rows: rowsCount,
      elapsed: timeElapsed,
    });
  } catch (error) {
    return handleFailure(500, error);
  }
});


module.exports = {
  app: app
};
