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
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_mobules/
      }
    ]
  },
  progress: true,
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DISABLE_SSR__: false,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

export default webpackConfig;
