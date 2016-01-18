require('babel-core/register');

var piping = require('piping');
var projectConfig = require('../../configs/project').default;
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var webpackIsomorphicToolsConfig = require('../../configs/webpack/webpackIsomorphicToolsConfig').default;

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var result;
if (__DEVELOPMENT__) {
  result = piping({ hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i });
  if (result) {
    setupIsomorphicTools();
  }
} else {
  setupIsomorphicTools();
}

function setupIsomorphicTools() {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
    .development()
    .server(projectConfig.projectRootPath, function () {
      require('./server');
    });
}
