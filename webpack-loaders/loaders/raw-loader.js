const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
    // == 一、获取 loader 参数
    const {name} = loaderUtils.getOptions(this);
    console.log('loader option params is:', name);


    // == 二、关闭 loader 缓存【缓存条件: loader 的结果在相同的输入下有确定的输出（有依赖的 loader 无法使用缓存）】
    this.cacheable(false);


    // == 三、通过 this.emitFile 进行文件写入
    const url = loaderUtils.interpolateName(
        this, // == 上下文环境
        "[name].[ext]", // == 源文件 - 名称和扩展名
        source
    );
    this.emitFile(path.join(__dirname, url), source);


    // == 四、异步 loader 结果处理
    // const callback = this.async();
    // fs.readFile(path.join(__dirname, '../src/async.txt'), 'utf-8', (err, data) => {
    //     callback(err, data);
    // });


    // == 五、同步 loader 结果处理
    const json = JSON.stringify(source)
        .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    // // == loader 异常处理: callback 可以回传多个值
    // // == throw new Error('Error');
    // // == this.callback(null, json, 2, 3, 4);
    return `export default ${json}`;
}
