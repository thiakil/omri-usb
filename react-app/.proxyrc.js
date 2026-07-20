const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('in proxy')
  app.use(
      //'/socket',
      createProxyMiddleware(
          {
            pathFilter: '/socket',
            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: true,
            //logger: console
          })
  );
};