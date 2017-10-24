import ip from 'ip';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import Express, { Router } from 'express';
import history from 'connect-history-api-fallback';
import proxyMiddleware from 'http-proxy-middleware';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../config/webpack.config.dev';

const app = new Express()
  , router = new Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add mock logic
require('./logic/users')(router);
require('./logic/charge')(router);
require('./logic/monitor')(router);
require('./logic/station')(router);

app.use((req, res, next) => {
  console.log('Request URL:', req.url);

  next();
});

// login
const loginRouter = new Router();
require('./logic/login')(loginRouter);

app.use(history());

if (process.env.PROXY) {
  app.use(proxyMiddleware('/login', {
    target: 'http://openportal.helianhealth.com:8010',
    changeOrigin: true,
  })).use(proxyMiddleware('/api', {
    target: 'http://openportal.helianhealth.com:8010',
    changeOrigin: true,
  }));
} else {
  app.use(loginRouter)
    .use('/api', router);
}

app.use(webpackMiddleware(webpack(webpackConfig), {
  quiet: true,
  stats: {
    colors: true,
    modules: false,
  },
}));

app.listen(3000, () => console.log(`Listening on http://${ip.address()}:3000/`));
