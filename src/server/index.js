const webpack = require('webpack');
const Express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const proxyMiddleware = require('http-proxy-middleware');
const webpackMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('../../config/webpack.config.dev');

const app = new Express(),
  defaultRouter = new Express.Router();

app
  .use((req, res, next) => console.log('Request URL:', req.url) || next())
  .use(history())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api', require('./logic')(defaultRouter));

if (process.env.PROXY) {
  app.use(
    proxyMiddleware('/api', {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true
    })
  );
}

app
  .use(
    webpackMiddleware(webpack(webpackConfig), {
      quiet: true,
      stats: {
        colors: true,
        modules: false
      }
    })
  )
  .listen(3000, () => console.log('Listening on http://localhost:3000/'));
