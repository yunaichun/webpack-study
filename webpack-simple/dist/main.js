
      (function(modules) {
        function require(fileName) {
          /** 获取 modules 对象的 fileName */
          const fn = modules[fileName];

          /** module 变量初始化, 会将依赖模块中的方法挂载到这里 */
          const module = { exports : {} };

          /** 执行 modules 对象的 fileName 函数 */
          fn(require, module, module.exports);

          /** 返回 module.exports, 即返回依赖模块中的方法 */
          /** 因为 babel 解析之后会将模块的方法挂载到 module.exports 中 */
          return module.exports;
        }

        /** 传入入口文件开始执行 */
        require('/Users/yunaichun/GitHub/webpack-study/webpack-simple/src/index.js');
      })({'/Users/yunaichun/GitHub/webpack-study/webpack-simple/src/index.js': function(require, module, exports) { 
        "use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('Jane'));
      },'./greeting.js': function(require, module, exports) { 
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  return 'hello ' + name;
}
      },})
    