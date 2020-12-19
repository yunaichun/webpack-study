const parser = require('@babel/parser');

const c = 'class Example {}';
const ast = parser.parse(c,  {
    sourceType: 'module',
    plugins: [
        'jsx',
        'flow',
    ]
});
console.log(ast);
