const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const kue = require('kue');
const ui = require('kue-ui');
const rateLimit = require('express-rate-limit');
const report = require('./jobs/report');
const config = require('../config');
const {
    publicRoute,
} = require('../routes');

//passport.use(strategy.local());
//passport.use(strategy.google());
//passport.use(strategy.bearer());
const app = express();
const io = socket.listen(app.listen(config.app.port));
var bodyParser = require('body-parser');
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);
report.startJob();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(passport.initialize());

app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 600,
        message: 'Too many requests',
    })
);
app.use(express.static('public'));

passport.serializeUser((user, cb) =>
    user !== null ? cb(null, user) : cb(null, false)
);

app.all('/public/*', [checkHeader.contentType]);

app.use((req, _res, next) => {
    req.io = io;
    next();
});

app.use('/public', publicRoute);

if (String(config.swagger.swagger_doc) === 'true') {
    app.use(morgan(':method | :status | :url | :response-time'));
    app.use('/doc', swaggerRoute);

    ui.setup({
        apiURL: '/api',
        baseURL: '/kue',
        updateInterval: 15000,
    });

    app.use('/api', kue.app);
    app.use('/kue', ui.app);
}

app.use(
    '/public-files',
    express.static(path.join(__dirname, `/../${config.file.local_path}/public`))
);


io.sockets.on('connection', () => {
    console.log('Express: Socket client connected');
});

module.exports = app;
