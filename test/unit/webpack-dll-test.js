const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

// == 切换目录
process.chdir(path.join(__dirname, '../template'));

rimraf('./dist', () => {
    const dllConfig = require(path.join(__dirname, '../../lib/webpack.dll.js'));
    webpack(dllConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));
    });
});
