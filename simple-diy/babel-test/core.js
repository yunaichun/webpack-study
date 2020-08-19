const parser = require('@babel/parser');
const { transformFromAst } = require('@babel/core');

const source = 'class Example {}';
const AST = parser.parse(source);
const { code, map, ast } = transformFromAst(AST, null, {
    presets: ['@babel/preset-env']
});
console.log(code, map, ast);
