import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpackIsomorphicToolsConfig from './webpackIsomorphicToolsConfig';
import projectConfig from '../project';

const webpackConfig = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      `${projectConfig.clientPath}/index.js`
    ]
  },
  output: {
    path: projectConfig.distPath,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_mobules/
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version',
          'sass?outputStyle=expanded&sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development()
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

export default webpackConfig;
