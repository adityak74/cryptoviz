const createAsyncRequestFactory = require('../../utils/helpers/request');

const WAZIRX_BASE_ENDPOINT = 'https://api.wazirx.com';
const WAZIRX_PREFIX_ROUTE = '/api/v2';

const WAZIRX_API = {
  MARKET_STATUS: '/market-status',
  MARKET_TICKER: '/tickers',
  MARKET_DEPTH: '/depth',
  MARKET_TRADE: '/trades',
};

const createAsyncRequest = createAsyncRequestFactory(`${WAZIRX_BASE_ENDPOINT}${WAZIRX_PREFIX_ROUTE}`);

const marketStatusAsync = cb => createAsyncRequest(WAZIRX_API.MARKET_STATUS, 'get', {}, cb);
const marketTickerAsync = cb => createAsyncRequest(WAZIRX_API.MARKET_TICKER, 'get', {}, cb);
const marketDepthAsync = args => cb => createAsyncRequest(WAZIRX_API.MARKET_DEPTH, 'get', args, cb);
const marketTradeAsync = args => cb => createAsyncRequest(WAZIRX_API.MARKET_TRADE, 'get', args, cb);

module.exports = {
  marketStatusAsync,
  marketTickerAsync,
  marketDepthAsync,
  marketTradeAsync,
};
