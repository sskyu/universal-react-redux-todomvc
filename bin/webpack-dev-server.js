require('babel-core/register');

const devServer = require('../configs/devServer').default;
const config = require('../configs/project').default;

const host = config.devServer.host;
const port = config.devServer.port;

devServer.listen(port, host, function () {
  console.log(`Webpack dev server running at ${host}: ${port}`);
});
