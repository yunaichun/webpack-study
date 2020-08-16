
const assert = require('assert');
const path = require('path');

// == 切换目录
process.chdir(path.join(__dirname, '../template'));
// == 获取当前目录
const projectRoot = process.cwd();

describe('webpack.base.js test case', () => {
    const baseConfig = require(path.join(__dirname, '../../lib/webpack.base.js'));
    it('entry', () => {
        assert.equal(baseConfig.entry.index, path.join(projectRoot, '/src/index/index.js'));
        assert.equal(baseConfig.entry.search, path.join(projectRoot, '/src/search/index.js'));
    });
});