import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import projectConfig from './project';
import webpackConfig from './webpack/developmentHot';

const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: projectConfig.srcPath,
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    color: true
  },
  historyApiFallback: true
});

export default server;
