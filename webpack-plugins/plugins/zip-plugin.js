const path = require('path');
// == 文档地址: https://stuk.github.io/jszip/documentation/examples.html
const JSZip = require('jszip');
const { RawSource } = require('webpack-sources');
const zip = new JSZip();

class ZipPlugin {
    constructor(options) {
        // == 一、插件传递参数
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin1', (compilation, callback) => {
            // == 二、插件的错误处理
            // compilation.warnings.push('warning 1111');
            // compilation.errors.push('error 222');

            // == 生成压缩文件名、zip 包里面文件
            const folder = zip.folder(this.options.folderName);
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer',
            }).then((contentBuffer) => {
                // == 绝对路径
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.folderName + '.zip',
                );
                // == 相对路径
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath,
                );

                // == 三、compilation 上的 assets 可以用于文件写入
                // == 文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources)
                compilation.assets[outputRelativePath] = new RawSource(contentBuffer);

                callback();
            });
        });
    }
}

module.exports = ZipPlugin;
