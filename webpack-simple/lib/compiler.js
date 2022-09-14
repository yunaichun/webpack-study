
const fs = require('fs');
const path = require('path');
const { getAST, getDependencis, transform } = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    /** 一、解析入口文件，收集依赖 */
    const entryModule = this.buildModule(this.entry, true);
    /** 二、解析入口文件的所有依赖 */
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    console.log(11111, this.modules);
    /** 三、根据 output 生成文件 */
    this.emitFiles();
  }

  /** 根据入口文件收集到文件依赖、转换为 es5 */
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      /** 绝对路径 */
      ast = getAST(filename);
    } else {
      /** 相对路径 */
      let absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencis(ast),
      transformCode: transform(ast)
    };
  }

  /** 输出文件 */
  emitFiles() { 
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    /** 1、生成 文件名:文件内容生成函数 的键值对 */
    this.modules.map((_module) => {
      modules += `'${_module.filename}': function(require, module, exports) { 
        ${_module.transformCode}
      },`
    });
      
    /** 2、自定义实现 require 方法和 module.exports 方法 */
    const bundle = `
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
        require('${this.entry}');
      })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
};
