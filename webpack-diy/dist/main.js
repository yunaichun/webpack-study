(function (modules) {
    function require(fileName) {
        // == 获取 modules 对象的 fileName
        const fn = modules[fileName];

        // == module 变量初始化, 会将依赖模块中的方法挂载到这里
        const module = { exports: {} };

        // == 执行 modules 对象的 fileName 函数
        fn(require, module, module.exports);

        // == 返回 module.exports, 即返回依赖模块中的方法
        // == 因为 babel 解析之后会将模块的方法挂载到 module.exports 中
        return module.exports;
    }

    // == 传入入口文件开始执行
    require('/Users/yunaichun/Github/WEBPACK/webpack-study/webpack-diy/src/index.js');
})({
    '/Users/yunaichun/Github/WEBPACK/webpack-study/webpack-diy/src/index.js': function (require, module, exports) {
        "use strict";

        // == 再次执行 require 方法: 
        // == 将依赖模块中的方法挂载到 入口 require 文件的 module.export 上
        // == 返回 module.export，即返回依赖里的 { greeting }
        var _greeting = require("./greeting.js");

        document.write((0, _greeting.greeting)('Jane'));
    },
    './greeting.js': function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        // == 这里的 exports 为父级传进来的
        // == 父级依赖到这个文件，就会调用 require 方法，将此方法挂载到父级的 module.exports 对象上
        exports.greeting = greeting;

        function greeting(name) {
            return 'hello' + name;
        }
    },
})
