import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
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
    // new HtmlWebpackPlugin({
    //   template: `${projectConfig.srcPath}/index.html`,
    //   filename: 'index.html',
    //   hash: true,
    //   inject: 'body'
    // })
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextWebpackPlugin('style.css')
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

export default webpackConfig;
