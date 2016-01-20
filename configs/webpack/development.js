import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpackIsomorphicToolsConfig from './webpackIsomorphicToolsConfig';
import baseConfig from './_base';

const webpackConfig = Object.assign({}, baseConfig);
webpackConfig.devtool = 'source-map';

webpackConfig.entry.app.unshift('webpack-hot-middleware/client');

webpackConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loaders: [
      'style',
      'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version',
      'sass?outputStyle=expanded&sourceMap'
    ]
  }
);

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development()
);

export default webpackConfig;
