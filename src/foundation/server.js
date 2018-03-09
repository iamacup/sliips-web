
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import chalk from 'chalk';
import fs from 'fs';
import https from 'https';
import createHistory from 'history/createMemoryHistory';

import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../foundation/redux/store';
import Html from '../foundation/utils/Html';
import App from '../foundation/app';
import routes from '../content/bootstrap/routes';

import { getEnvironment } from '../foundation/utils/utilityFunctions';
import { port, host } from '../foundation/config';

const app = express();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());

// Use morgan for http request debug (only show error)
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.join(process.cwd(), './public/favicon.ico')));
app.use(express.static(path.join(process.cwd(), './public')));

// allow us to see the cookies
app.use(cookieParser());

// Run express as webpack dev server
if (__DEV__) {
  const webpack = require('webpack');
  const webpackConfig = require('../../tools/webpack/config.babel');

  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true,
    }),
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

console.info(chalk.green('The API endpoint is setup to: ' + getEnvironment()));

// SSL Server
if (getEnvironment() === 'live') {
  const key = process.env.SSL_KEY_FILE_LOCATION;
  const cert = process.env.SSL_CERT_FILE_LOCATION;

  if (fs.existsSync(key) && fs.existsSync(cert)) {
    https.createServer({
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    }, app).listen(443);

    console.info(chalk.green(`==> 🌎  Listening at https://${host}:443`));
  } else {
    console.info(chalk.red('Could not start the server on SSL because could not find the certificates'));
  }
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  const renderHtml = (store, htmlContent) => { // eslint-disable-line no-shadow
    const html = renderToStaticMarkup(<Html store={store} htmlContent={htmlContent} />);

    return `<!doctype html>${html}`;
  };

  // If __DISABLE_SSR__ = true, disable server side rendering
  if (__DISABLE_SSR__) {
    res.send(renderHtml(store));
    return;
  }

  // Load data on server-side
  const loadBranchData = () => {
    const promises = [];

    routes.some((route) => {
      const match = matchPath(req.path, route);

      if (match && route.loadData) {
        promises.push(route.loadData(store.dispatch, match.params, req.cookies));
      }

      return match;
    });

    return Promise.all(promises);
  };

  // Send response after all the action(s) are dispathed
  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      // Setup React-Router server-side rendering
      const routerContext = {};
      const obj = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </Provider>
      );
      const htmlContent = renderToString(obj);

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url);
        res.end();

        return;
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(store, htmlContent));
    } catch (err) {
      res.status(404).send('Not Found :(');

      console.error(`==> 😭  Rendering routes error: ${err}`);
    }
  })();
});

if (port) {
  app.listen(port, host, (err) => {
    const url = `http://${host}:${port}`;

    if (err) console.error(`==> 😭  OMG!!! ${err}`);

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    // Open browser only if we are pointing at the local instance of the API
    if (getEnvironment() === 'local') {
      require('../../tools/openBrowser')(url);
    }
  });
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'));
}
