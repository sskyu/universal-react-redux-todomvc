import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './_base';
import projectConfig from '../project';
import buildConfig from '../build';

const { host, port } = projectConfig.devServer;

const webpackConfig = Object.assign({}, baseConfig);
webpackConfig.devtool = 'source-map';

webpackConfig.entry.app.unshift(
  `webpack-dev-server/client?http://${host}:${port}`,
  'webpack/hot/dev-server'
);

webpackConfig.module.loaders.push(
  {
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    exclude: /node_mobules/,
    include: projectConfig.srcPath
  },
  {
    test: /\.css$/,
    loaders: [
      'style',
      `css?modules&localIdentName=${buildConfig.css.localIdentName}!postcss`
    ]
  }
);

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true
  }),

  new HtmlWebpackPlugin({
    template: `${projectConfig.srcPath}/development.html`,
    filename: 'index.html',
    inject: 'body'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

export default webpackConfig;
