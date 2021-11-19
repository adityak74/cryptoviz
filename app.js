const apis = require("./config/api-config");
const PORT = 8081;
const { sql } = require('./utils');

apis.app.listen(process.env.PORT || PORT, async function() {
    const { select } = sql;
    const { countAllCoinsDataAndCache } = select;
    await countAllCoinsDataAndCache();
    console.log("Server listening, populating cache");
    console.log("server connected to port " + process.env.PORT || PORT);
});
