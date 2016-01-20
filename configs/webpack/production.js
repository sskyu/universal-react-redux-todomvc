import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpackIsomorphicToolsConfig from './webpackIsomorphicToolsConfig';
import baseConfig from './_base';
import projectConfig from '../project';

const webpackConfig = Object.assign({}, baseConfig);

webpackConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
  }
);

webpackConfig.plugins.push(
  new CleanPlugin(['dist'], {
    root: projectConfig.rootPath,
    verbose: true,
    dry: false
  }),

  // css files from the extract-text-plugin loader
  new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

  // set global vars
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      NODE_ENV: JSON.stringify('production')
    }
  }),

  // optimizations
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),


  new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
);

export default webpackConfig;
