import path from 'path';
import Express from 'express';
import hogan from 'hogan-express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RoutingContext } from 'react-router';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import routes from '../common/routes';
import { fetchTodos } from '../common/api/todos';

const app = new Express();
const port = process.env.PORT || 8500;

const compiler = webpack(webpackConfig);

app.engine('html', hogan);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));

app.use(Express.static(`${__dirname}/public`));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(handleRender);

function handleRender(req, res) {
  match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.status(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return res.status(404).send('Not found');
    }

    fetchTodos(todos => {
      const initialState = { todos };
      const store = configureStore(initialState);

      const html = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const finalState = store.getState();

      res.status(200).render('index', {
        html,
        initialState: JSON.stringify(finalState)
      });
    });
  });
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
