const webpack = require('webpack');
const Express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const proxyMiddleware = require('http-proxy-middleware');
const webpackMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('../../config/webpack.config.dev');

const { Router } = Express,
  app = new Express(),
  defaultRouter = new Router();

// login
const loginRouter = new Router();
require('./logic/login')(loginRouter);

// add mock logic
require('./logic/users')(defaultRouter);
require('./logic/charge')(defaultRouter);
require('./logic/monitor')(defaultRouter);
require('./logic/station')(defaultRouter);

app.use((req, res, next) => {
  console.log('Request URL:', req.url);

  next();
});

app.use(history());

if (process.env.PROXY) {
  app
    .use(
      proxyMiddleware('/login', {
        target: 'http://openportal.helianhealth.com:8010',
        changeOrigin: true
      })
    )
    .use(
      proxyMiddleware('/api', {
        target: 'http://openportal.helianhealth.com:8010',
        changeOrigin: true
      })
    );
} else {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(loginRouter)
    .use('/api', defaultRouter);
}

app.use(
  webpackMiddleware(webpack(webpackConfig), {
    quiet: true,
    stats: {
      colors: true,
      modules: false
    }
  })
);

app.listen(3000, () => console.log('Listening on http://localhost:3000/'));
