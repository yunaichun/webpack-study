const parser = require('@babel/parser');
const { transformFromAst } = require('@babel/core');

const source = 'class Example {}';
const AST = parser.parse(source);
const { code } = transformFromAst(AST, null, {
    presets: ['@babel/preset-env']
});
console.log(code);
