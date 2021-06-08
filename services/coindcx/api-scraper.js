const createAsyncRequestFactory = require('../../utils/helpers/request');

const COINDCX_BASE_ENDPOINT = 'https://api.coindcx.com';

const COINDCX_API = {
  MARKET_DETAILS: '/exchange/v1/markets_details',
  MARKET_TICKER: '/exchange/ticker',
};

const createAsyncRequest = createAsyncRequestFactory(COINDCX_BASE_ENDPOINT);

const marketDetailsAsync = cb => createAsyncRequest(COINDCX_API.MARKET_DETAILS, 'get', {}, cb);
const marketTickerAsync = cb => createAsyncRequest(COINDCX_API.MARKET_TICKER, 'get', {}, cb);

module.exports = {
    marketDetailsAsync,
    marketTickerAsync,
};
