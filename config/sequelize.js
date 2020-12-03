const config = require('./index');

module.exports = {
    local: config.postgres,
    development: config.postgres,
    production: config.postgres,
    test: config.postgres,
};
