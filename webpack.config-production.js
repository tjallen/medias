var WebpackStripLoader = require('strip-loader');
var devCfg = require('./webpack.config.js');

var stripLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log'),
};

devCfg.module.loaders.push(stripLoader);

module.exports = devCfg;
