const path = require('path');
/** https://stuk.github.io/jszip/documentation/examples.html */
const JSZip = require('jszip');
const { RawSource } = require('webpack-sources');
const zip = new JSZip();

class ZipPlugin {
  constructor(options) {
    /** 插件传递参数 */
    this.options = options;
  }

  /** 通过插件的 apply 方法完成注入 */
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin1', (compilation, callback) => {
      /** 1、生成压缩文件名内容 */
      const folder = zip.folder(this.options.folderName);
      /** 2、压缩文件内容: 文件名 + 文件内容 */
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source();
        folder.file(filename, source);
      }

      /** 3、执行压缩 */
      zip.generateAsync({
        type: 'nodebuffer',
      }).then((contentBuffer) => {
        /** 绝对路径: .../dist/offline.zip */
        const outputPath = path.join(
          compilation.options.output.path, 
          this.options.folderName + '.zip',
        );
        /**  相对路径: .../dist/offline.zip */
        const outputRelativePath = path.relative(
          compilation.options.output.path,
          outputPath,
        );

        /** 3、compilation 上的 assets 可以用于文件写入 */
        /** 文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources) */
        compilation.assets[outputRelativePath] = new RawSource(contentBuffer);

        callback();
      });
    });
    /** 二、插件的错误处理 */
    // compilation.warnings.push('warning 1111');
    // compilation.errors.push('error 222');
  }
}
module.exports = ZipPlugin;
