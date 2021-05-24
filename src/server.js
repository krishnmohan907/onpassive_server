const app = require('./app');
const { server } = require('./config/config');
var http = require('http').createServer(app);
const config = require('./config/config');
http.listen(config.server.port, (req, res) => {
    if (config.server.host != 'localhost' && config.server.host != '0.0.0.0') {
        console.log('data base connection is sucessfully completed')
    } else {
        config.server.host = 'localhost';
        console.log(`express server listening on http://${config.server.host}:${config.server.port}`)
    }
});


module.exports = app