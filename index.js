const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

// create server
const SERVER = http.createServer(app);

// listen to the server
SERVER.listen(config.PORT, () => {
    logger.info(`Server is running on port: ${config.PORT}`);
});