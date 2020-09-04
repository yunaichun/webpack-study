
(function (modules) {
  function require(fileName) {
    // == 获取 modules 对象的 fileName
    const fn = modules[fileName];

    // == module 变量初始化
    const module = { exports: {} };

    // == 执行 modules 对象的 fileName 函数
    fn(require, module, module.exports);

    // == 返回 module 对象上的 exports 属性
    return module.exports;
  }

  require('/Users/yunaichun/Github/WEBPACK/webpack-study/simple-diy/src/index.js');
})({
  '/Users/yunaichun/Github/WEBPACK/webpack-study/simple-diy/src/index.js': function (require, module, exports) {
    "use strict";

    var _greeting = require("./greeting.js");

    document.write((0, _greeting.greeting)('Jane'));
  },
  './greeting.js': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.greeting = greeting;

    function greeting(name) {
      return 'hello' + name;
    }
  },
})
