const cronitor = require('cronitor')('');

const monitor = new cronitor.Monitor('important-heartbeat-monitor');

// send a heartbeat event with a message
monitor.ping({message: 'Alive'});