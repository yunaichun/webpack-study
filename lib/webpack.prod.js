const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();
// eslint-disable-next-line global-require
const DLLMainfestFile = require(path.join(projectRoot, 'build/library/library.json'));

const prodConfig = {
  mode: 'production',
  plugins: [
    // == 压缩和优化 css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // == 去除无用的 css 类（需要配合 MiniCssExtractPlugin 一起使用）
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(projectRoot, 'src')}/**/*`, { nodir: true }),
    }),
    // == 拉取 cdn，提升构建速度【缺点：一个基础库需要指定一个 cdn，会有很多 script 标签】
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
    // == 加快构建速度：预编译资源文件
    new webpack.DllReferencePlugin({
      manifest: DLLMainfestFile,
    }),
    // == 开启硬件缓存
    new HardSourceWebpackPlugin(),
  ],
  optimization: {
    // == 代码分割
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    // == 多进程：代码并行压缩
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // == 代码并行压缩时开启缓存
        cache: true,
      }),
    ],
  },
  // == 减少文件索搜范围
  // resolve: {
  //     alias: {
  //         'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
  //         'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
  //         '@': path.resolve('src'),
  //     },
  //     extensions: ['.js'],
  //     mainFields: ['main']
  // }
};

module.exports = merge(baseConfig, prodConfig);
