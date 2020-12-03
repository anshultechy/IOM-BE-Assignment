const dot = require('dotenv');
dot.config();
const app = require('./app');
const postgres = require('./postgres');
module.exports = {
    app,
    postgres
};
