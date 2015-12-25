import baseConfig from './_base';

const webpackConfig = Object.assign({}, baseConfig);
webpackConfig.devtool = 'cheap-module-eval-source-map';

export default webpackConfig;
