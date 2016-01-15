require('babel-core/register');

var projectConfig = require('../../configs/project').default;
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var webpackIsomorphicToolsConfig = require('../../configs/webpack/webpackIsomorphicToolsConfig').default;

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development()
  .server(projectConfig.projectRootPath, function () {
    require('./server');
  });
