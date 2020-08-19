const path = require('path');
const { getAST, getDependencis, transform } = require('./parser');

const ast = getAST(path.join(__dirname, '../src/index.js'));
const dependencis = getDependencis(ast);
const source = transform(ast);
console.log(source);
