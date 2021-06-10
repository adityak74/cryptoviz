const assert = require('assert');
const { marketDetailsAsync, marketTickerAsync } = require('../services/coindcx/api-scraper');

// sample data we will only compare the keys here
const marketDetailsShape = {
    "coindcx_name": "SNMBTC",
    "base_currency_short_name": "BTC",
    "target_currency_short_name": "SNM",
    "target_currency_name": "Sonm",
    "base_currency_name": "Bitcoin",
    "min_quantity": 1,
    "max_quantity": 90000000,
    "min_price": 5.66e-7,
    "max_price": 0.0000566,
    "min_notional": 0.001,
    "base_currency_precision": 8,
    "target_currency_precision": 0,
    "step": 1,
    "order_types": [ "take_profit", "stop_limit", "market_order", "limit_order" ],
    "symbol": "SNMBTC",
    "ecode": "B",
    "max_leverage": 3,
    "max_leverage_short": null,
    "pair": "B-SNM_BTC",
    "status": "active"
};

// sample data we will only compare the keys here
const marketTickerShape = {
    market: "BTCINR",
    change_24_hour: "11.565",
    high: "2880000.0",
    low: "2508036.98",
    volume: "104871254.3999999712",
    last_price: "2851176.790000",
    bid: "2846000",
    ask: "2851046.84",
    timestamp: 1623288922
};

describe('CoinDCX Market Details Async', function () {
    it('response shape should match', function () {
        marketDetailsAsync(function(error, response) {
            const responseObject = JSON.parse(response.text);
            assert.deepEqual(Object.keys(marketDetailsShape), Object.keys(responseObject[0]));
        });
    });
});


describe('CoinDCX Market Ticker Async', function () {
    it('response shape should match', function () {
        marketTickerAsync(function(error, response) {
            const responseObject = JSON.parse(response.text);
            assert.deepEqual(Object.keys(marketTickerShape), Object.keys(responseObject[0]));
        });
    });
});