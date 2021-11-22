const { createLogger, format, transports } = require('winston');

const httpOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY}&ddsource=nodejs&service=${process.env.DATADOG_APP_NAME}`,
    ssl: true,
};

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.Http(httpOptions),
    ],
});

module.exports = logger;
