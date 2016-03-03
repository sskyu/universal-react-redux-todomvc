import path from 'path';
import Express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import projectConfig from '../../configs/project';

import routeHandler from './routeHandler';

const app = new Express();
const host = projectConfig.prodServer.host;
const port = process.env.PORT || projectConfig.prodServer.port;

app.use(Express.static(`${__dirname}/../../dist`));

const router = Express.Router();

app.use(routeHandler);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://${host}:${port}/ in your browser.`);
  }
});
