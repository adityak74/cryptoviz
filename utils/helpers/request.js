const request = require('superagent');

const createAsyncRequest = (
    baseUrl,
  ) => {
    return (        
        pathUrl,
        type,
        args,
        callback,
        reqTimeout = 60000
    ) => {
        const argsTypeFunc = type === 'get' ? 'query' : 'send';
        request[type](`${baseUrl}${pathUrl}`)
        [argsTypeFunc](args)
        .timeout(reqTimeout)
        .end(callback);
    };  
};

module.exports = createAsyncRequest;
