import webpack from 'webpack';
import webpackConfig from './development';
import config from '../project';

const webpackPublicPath = `http://${config.devServer.host}:${config.devServer.port}/`

webpackConfig.entry.app.push(
  `webpack-dev-server/client?${webpackPublicPath}`,
  'webpack/hot/dev-server'
);

export default webpackConfig;
