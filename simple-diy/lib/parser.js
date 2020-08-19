
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = {
    // == 解析成 AST【@babel/parser】
    getAST: (path) => {
        const content = fs.readFileSync(path, 'utf-8');

        return parser.parse(content, {
            sourceType: 'module',
            plugins: [
                'jsx',
                'flow',
            ]
        });
    },

    // == 分析依赖 【@babel/traverse】
    getDependencis: (ast) => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },

    // == 将 ast 转换成代码
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
      
        return code;
    }
};