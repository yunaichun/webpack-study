const parser = require('@babel/parser');
const generate = require('@babel/generator').default;

const source = 'class Example {}';
const AST = parser.parse(source);
const output = generate(AST, { /* options */ }, source);
console.log(output);


// == AST from Multiple Sources
const sourceA = 'var a = 1;';
const sourceB = 'var b = 2;';
const astA = parser.parse(sourceA, { sourceFilename: 'a.js' });
const astB = parser.parse(sourceB, { sourceFilename: 'b.js' });
const astAandB = {
  type: 'Program',
  body: [].concat(astA.program.body, astB.program.body)
};

const { code, map } = generate(astAandB, { sourceMaps: true }, {
  'a.js': sourceA,
  'b.js': sourceB,
});
console.log(code, map);
