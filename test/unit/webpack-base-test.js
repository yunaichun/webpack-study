
const assert = require('assert');
const path = require('path');

describe('webpack.base.js test case', () => {
    // == 切换目录
    process.chdir(path.join(__dirname, '../template'));
    const baseConfig = require(path.join(__dirname, '../../lib/webpack.base.js'))
    it('entry', () => {
        // == 获取当前目录
        const projectRoot = process.cwd();    
        assert.equal(baseConfig.entry.index, path.join(projectRoot, '/src/index/index.js'));
        assert.equal(baseConfig.entry.search, path.join(projectRoot, '/src/search/index.js'));
    });
});