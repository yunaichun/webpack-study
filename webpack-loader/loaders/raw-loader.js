const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
  /** 一、获取 loader 参数 */
  const {name} = loaderUtils.getOptions(this);
  console.log('loader option params is:', name);

  /** 二、关闭 loader 缓存【缓存条件: loader 的结果在相同的输入下有确定的输出（有依赖的 loader 无法使用缓存）】 */
  this.cacheable(false);

  /** 三、替换文件内容文本 */
  const json = source
      .replace('foo', '')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

  /** 四、通过 this.emitFile 进行文件写入 */
  const url = loaderUtils.interpolateName(
    /** 上下文环境 */
    this,
    /** 源文件: 名称和扩展名 */
    "[name].[ext]",
    /** 内容 */
    json
  );
  this.emitFile(path.join(__dirname, `../dist/${url}`), json);

  /** 五、处理后的结果返回给下一个 loader */
  /** 异步处理结果用 this.async() */
  return json;
}
