import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './_base';
import projectConfig from '../project';
import buildConfig from '../build';

const webpackConfig = Object.assign({}, baseConfig);

webpackConfig.module.loaders.push(
  {
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /node_mobules/,
    include: projectConfig.srcPath
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      `css?modules&localIdentName=${buildConfig.css.localIdentName}!postcss`
    )
  }
);

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: false
  }),

  // set global vars
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      NODE_ENV: JSON.stringify('production')
    }
  }),

  // css files from the extract-text-plugin loader
  new ExtractTextPlugin('[name].css', { allChunks: true }),

  // optimizations
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

export default webpackConfig;
