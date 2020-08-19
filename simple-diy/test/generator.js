const parser = require('@babel/parser');
const generate = require('@babel/generator').default;

const c = 'class Example {}';
const ast = parser.parse(c);
const output = generate(ast, { /* options */ }, c);
console.log(ast);
console.log(output);


// == AST from Multiple Sources
const a = 'var a = 1;';
const b = 'var b = 2;';
const astA = parser.parse(a, { sourceFilename: 'a.js' });
const astB = parser.parse(b, { sourceFilename: 'b.js' });
const AST = {
  type: 'Program',
  body: [].concat(astA.program.body, astB.program.body)
};

const { code, map } = generate(AST, { sourceMaps: true }, {
  'a.js': a,
  'b.js': b
});
console.log(code);
console.log(map);
