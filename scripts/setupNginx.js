const nginx = require('nginx');

// setup cryptoviz.adityakarnam.me
const nginxConfigOptions = {
    server_name: 'cryptoviz.adityakarnam.me',
    source_ssl: 'http',
    source_host: 'localhost',
    source_port: '3001',
};
await nginx.reverse(nginxConfigOptions);
await nginx.install_ssl(nginxConfigOptions.server_name);
