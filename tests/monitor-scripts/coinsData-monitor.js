const request = require('superagent');
const { interval } = require('rxjs');

const makeRequest = () => new Promise((resolve, reject) => {
    request
        .get('https://cryptoviz.adityakarnam.me/coinsData')
        .end((err, response) => {
            if (err) return reject(err);
            resolve(response);
        });
});

const everyMinute = interval(60000);

everyMinute.subscribe(async () => {
    try {
        const coinsDataRequest = await makeRequest();
        console.log(coinsDataRequest.statusCode, coinsDataRequest.body.coinsData.length);
    } catch (error) {
        console.error("Error:", error);
    }
});
