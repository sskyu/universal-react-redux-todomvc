import webpack from 'webpack';
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
        test: /\.css$/,
        loaders: ['style', 'raw']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

export default webpackConfig;
