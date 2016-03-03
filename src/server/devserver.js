import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import projectConfig from '../../configs/project';

const { port } = projectConfig.devServer;

const compiler = webpack(webpackConfig);
new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true
})
.listen(port)
