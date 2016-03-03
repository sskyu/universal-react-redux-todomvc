import webpack from 'webpack';
import projectConfig from '../project';

const webpackConfig = {
  entry: {
    app: [
      `${projectConfig.clientPath}/index.js`
    ]
  },
  output: {
    path: projectConfig.distPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: []
  },
  postcss: (webpack) => [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('precss'),
    require('postcss-cssnext')
  ],
  progress: true,
  plugins: [],
  resolve: {
    extensions: ['', '.js']
  }
};

export default webpackConfig;
