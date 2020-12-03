const fs = require('fs');

let dialectOptions = {};
const useSSL = process.env.NODE_ENV === 'production';

if (useSSL) {
    const cert = fs.readFileSync('/var/www/database/ca-certificate.crt');

    dialectOptions = {
        ssl: {
            sslmode: 'require',
            ca: cert.toString(),
        },
    };

    console.info('Enabling SSL for postgres connection.');
}

const postgres = {
    username: process.env.POSTGRES_USERNAME,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    pool: {
        idle: parseInt(process.env.POSTGRES_POOL_IDLE),
        min: parseInt(process.env.POSTGRES_POOL_MIN),
        max: parseInt(process.env.POSTGRES_POOL_MAX),
    },
    dialect: 'postgres',
    dialectOptions,
    ssl: useSSL,
    native: true,
};

module.exports = postgres;
