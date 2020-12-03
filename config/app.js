const app = {
    http_scheme: process.env.HTTP_SCHEME,
    node_env: process.env.NODE_ENV,
    host: process.env.HOST,
    proxy_host: process.env.PROXY_HOST,
    port: process.env.PORT,
    frontend_url: process.env.FRONTEND_URL,
};

module.exports = app;
