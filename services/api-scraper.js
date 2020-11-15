const request = require('superagent');
const async = require('async');

const WAZIRX_BASE_ENDPOINT = 'https://api.wazirx.com';
const WAZIRX_PREFIX_ROUTE = '/api/v2';
const WAZIRX_BASE_URL = WAZIRX_BASE_ENDPOINT + WAZIRX_PREFIX_ROUTE;

const WAZIRX_API = {
  MARKET_STATUS: '/market-status',
  MARKET_TICKER: '/tickers',
  MARKET_DEPTH: '/depth',
  MARKET_TRADE: '/trades',
};

const createAsyncRequest = (
  api,
  type,
  args,
  callback
) => {
  const argsTypeFunc = type === 'get' ? 'query' : 'send';
  request[type](WAZIRX_BASE_URL + WAZIRX_API[api])
  [argsTypeFunc](args)
  .end(callback);
};

const marketStatusAsync = cb => createAsyncRequest('MARKET_STATUS', 'get', {}, cb);
const marketTickerAsync = cb => createAsyncRequest('MARKET_TICKER', 'get', {}, cb);
const marketDepthAsync = args => cb => createAsyncRequest('MARKET_DEPTH', 'get', args, cb);
const marketTradeAsync = cb => createAsyncRequest('MARKET_TRADE', 'get', {}, cb);

async.parallel([
  marketStatusAsync,
  marketTickerAsync,
], function(err, results) {
  // optional callback
  if (err) console.log('err', err);
  const coins = results[1].body;
  const marketDepthCoins = Object.keys(coins);
  const marketDepthForCoinsAsync = marketDepthCoins.map(coin => marketDepthAsync({ market: coin }));
  async.parallel(marketDepthForCoinsAsync, (error, depthResults) => {
    // parse the response here
  });
});
