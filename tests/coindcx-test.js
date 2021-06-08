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

describe('CoinDCX Market Details Async', function () {
    it('should return valid response', function () {
        marketDetailsAsync(function(error, response) {
            const responseObject = JSON.parse(response.text);
            assert.deepEqual(Object.keys(marketDetailsShape), Object.keys(responseObject[0]));
        });
    });
});
