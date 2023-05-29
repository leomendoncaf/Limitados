const morgan = require('morgan');

const logger = morgan('combined'); // utilizando o formato "combined" para registro completo

module.exports = logger;
