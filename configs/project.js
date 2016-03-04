import path from 'path';

const projectRootPath = path.resolve(__dirname, '../');
const srcPath         = path.resolve(projectRootPath, 'src');
const distPath        = path.resolve(projectRootPath, 'dist');
const clientPath      = path.resolve(srcPath, 'client');
const serverPath      = path.resolve(srcPath, 'server');

const devServer = {
  host: 'localhost',
  port: 8999
};
const prodServer = {
  host: 'localhost',
  port: 8989
};

export default {
  projectRootPath,
  srcPath,
  clientPath,
  serverPath,
  distPath,
  devServer,
  prodServer
};
