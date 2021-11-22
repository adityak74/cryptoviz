const apis = require("./config/api-config");
const path  = require('path');
const dotenv = require('dotenv');
const PORT = 8081;
const { sql } = require('./utils');

if (!process.env.GCP_PROJECT) {
    dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`) });
}

apis.app.listen(process.env.PORT || PORT, async function() {
    const { select } = sql;
    const { countAllCoinsDataAndCache } = select;
    await countAllCoinsDataAndCache();
    console.log("Server listening, populating cache");
    console.log("server connected to port " + process.env.PORT || PORT);
});
