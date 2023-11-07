const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:15019';

const context = [
  "/weatherforecast",
  "/api"
];
const contextNBU =  [
  '/NBU_Exchange',
  '/NBUStatService'
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  const appProxyNBU = createProxyMiddleware(contextNBU, {
        target: 'https://bank.gov.ua',
        changeOrigin: true,
    });

  app.use(appProxy);
  app.use(appProxyNBU);
};
