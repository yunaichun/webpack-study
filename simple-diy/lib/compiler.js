
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
        // == 一、根据入口文件收集到文件依赖、转换为 es5
        const entryModule = this.buildModule(this.entry, true);
        // == 二、批量收集依赖
        this.modules.push(entryModule);
        this.modules.map((_module) => {
            _module.dependencies.map((dependency) => {
                this.modules.push(this.buildModule(dependency));
            });
        });
        // == 三、生成文件
        this.emitFiles();
    }

    // == 根据入口文件收集到文件依赖、转换为 es5
    buildModule(filename, isEntry) {
        let ast;
        // == 获取 ast
        if (isEntry) {
            // == 绝对路径
            ast = getAST(filename);
        } else {
            // == 相对路径
            let absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath);
        }

        return {
          filename,
          dependencies: getDependencis(ast),
          transformCode: transform(ast)
        };
    }

    // == 输出文件
    emitFiles() { 
        const outputPath = path.join(this.output.path, this.output.filename);
        let modules = '';
        this.modules.map((_module) => {
            modules += `'${ _module.filename }': function (require, module, exports) { ${ _module.transformCode } },`
        });
        
        const bundle = `
            (function(modules) {
                function require(fileName) {
                    const fn = modules[fileName];
        
                    const module = { exports : {} };
        
                    fn(require, module, module.exports);
        
                    return module.exports;
                }

                require('${this.entry}');
            })({${modules}})
        `;
    
        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
};
