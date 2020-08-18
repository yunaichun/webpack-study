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
    const prodConfig = require(path.join(__dirname, '../../lib/webpack.prod.js'));
    // == 到 template 目录执行 webpack 命令
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test.');

        mocha.addFile(path.join(__dirname, '../cases/html-test.js'));
        mocha.addFile(path.join(__dirname, '../cases/css-js-test.js'));
        mocha.run();
    });
});
