const Compiler = require('./compiler');
const options = require('../simplepack.config');

const compiler = new Compiler(options);
compiler.run();
