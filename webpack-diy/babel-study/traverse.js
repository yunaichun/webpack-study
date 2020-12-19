const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

const souce = `function square(n) {
  return n * n;
}`;

const AST = parser.parse(souce);

traverse(AST, {
    enter(path) {
        if (path.isIdentifier({ name: "n" })) {
            path.node.name = 'x';
        }
    }
});

// == 所有 type - https://babeljs.io/docs/en/babel-types#api
traverse(AST, {
    FunctionDeclaration: function(path) {
        path.node.id.name = 'x';
    }
});


// == 测试: AST是否被修改
const { code } = transformFromAst(AST, null, {
    presets: ['@babel/preset-env']
});
console.log(code);
