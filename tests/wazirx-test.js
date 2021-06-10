const assert = require('assert');
const {
    marketDepthAsync,
    marketStatusAsync,
    marketTickerAsync,
    marketTradeAsync,
} = require('../services/wazirx/api-scraper');

// sample data we will only compare the keys here
const marketTickerShape = {
    base_unit: "btc",
    quote_unit: "inr",
    low: "2571299.0",
    high: "2868086.0",
    last: "2809648.0",
    type: "SPOT",
    open: 2576204,
    volume: "281.25501",
    sell: "2810052.0",
    buy: "2805242.0",
    at: 1623305268,
    name: "BTC/INR"
};

const marketStatusShape = {
    baseMarket: "xrp",
    quoteMarket: "btc",
    minBuyAmount: 0.0001,
    minSellAmount: 0.0001,
    basePrecision: 1,
    quotePrecision: 8,
    status: "active",
    fee: {
        bid: {
            maker: 0.002,
            taker: 0.002
        },
        ask: {
            maker: 0.002,
            taker: 0.002
        }
    },
    low: "0.00002425",
    high: "0.00002601",
    last: "0.00002449",
    type: "SPOT",
    open: 0.00002601,
    volume: "7094.0",
    sell: "0.00002449",
    buy: "0.00002422",
    at: 1623290104
};

const marketDepthShape = {
    timestamp: 123,
    asks: [],
    bids: []
};

const marketTradeTicker = {
    id: 127224500,
    market: "btcusdt",
    price: "36617.0",
    volume: "0.00046",
    funds: "16.84382",
    created_at: "2021-06-10T06:07:26Z",
    side: null
};

describe('WazirX Market Status', function () {
    it('response shape should match', function () {
        marketStatusAsync(function(error, response) {
            const responseObject = JSON.parse(response.text).markets;
            assert.deepEqual(Object.keys(marketStatusShape), Object.keys(responseObject[0]));
        });
    });
});


describe('WazirX Market Ticker Async', function () {
    it('response shape should match', function () {
        marketTickerAsync(function(error, response) {
            const responseObject = JSON.parse(response.text).btcinr;
            assert.deepEqual(Object.keys(marketTickerShape), Object.keys(responseObject));
        });
    });
});

describe('WazirX Depth Details Async', function () {
    it('response shape should match', function () {
        marketDepthAsync(function(error, response) {
            const responseObject = JSON.parse(response.text);
            assert.deepEqual(Object.keys(marketDepthShape), Object.keys(responseObject));
        });
    });
});


describe('WazirX Trade Ticker Async', function () {
    it('response shape should match', function () {
        marketTradeAsync(function(error, response) {
            const responseObject = JSON.parse(response.text);
            assert.deepEqual(Object.keys(marketTradeTicker), Object.keys(responseObject[0]));
        });
    });
});
