require('babel-core/register');

var hook = require('css-modules-require-hook');
var projectConfig = require('../configs/project').default;
var buildConfig = require('../configs/build').default;

hook({
  generateScopedName: buildConfig.css.localIdentName
});

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('../src/server');
