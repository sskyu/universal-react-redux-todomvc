require('babel-core/register');

var projectConfig = require('../../configs/project').default;
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var webpackIsomorphicToolsConfig = require('../../configs/webpack/webpackIsomorphicToolsConfig').default;

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

console.log();
console.log();
console.log('__DEVELOPMENT__', __DEVELOPMENT__);
console.log();
console.log();

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development(__DEVELOPMENT__)
  .server(projectConfig.projectRootPath, function () {
    require('./server');
  });
