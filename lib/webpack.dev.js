
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  // == 开发环境服务和代理
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/api': {
          target: 'https://localhost',
          changeOrigin: true,
          logLevel: 'debug',
      },
    },
    // == output 配置项 publicPath: '',
    contentBase: './dist',
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // == 开启 source map
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
