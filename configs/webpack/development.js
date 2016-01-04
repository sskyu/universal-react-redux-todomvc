import webpack from 'webpack';
import baseConfig from './_base';

const webpackConfig = Object.assign({}, baseConfig);
webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

export default webpackConfig;
