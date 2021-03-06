
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();

// == 多页面打包
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      // == entry 入口
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];
      entry[pageName] = entryFile;

      // == HtmlWebpackPlugin 构建的页面
      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inject: true,
          filename: `${pageName}.html`,
          template: path.join(projectRoot, `./src/${pageName}/index.html`),
          chunks: ['vendors', pageName],
          minify: {
            html5: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: false,
            collapseWhitespace: true,
            preserveLineBreaks: false,
          },
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      // == 加载 js
      {
        test: /\.jsx?$/,
        // == 缩小构建目标
        exclude: /(node_modules|bower_components)/,
        use: [
          // == 多进程：解析资源
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          {
            // == 开启缓存：cacheDirectory=true 转换 js 语法缓存
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        ],
      },
      // == 加载 css
      {
        test: /.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                px2rem({
                  remUnit: 50,
                }),
              ],
            },
          },
          'less-loader',
        ],
      },
      // == 加载图片
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          // == 加载图片
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name]_[hash:8].[ext]',
            },
          },
          // == 压缩图片
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // == 加载字体
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // == 提取 css
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // == 清空 output 目录
    new CleanWebpackPlugin(),
    // == 构建日志输出
    new FriendlyErrorsWebpackPlugin(),
    // == 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // == 构建异常和终端处理
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
