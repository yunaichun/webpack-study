// Load in dependencies
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
    // == 1、异步 loader 结果处理通过 this.async() 处理
    // const callback = this.async();
    // fs.readFile(path.join(__dirname, '../src/async.txt'), 'utf-8', (err, data) => {
    //     callback(err, data);
    // });
    // == 2、异步 loader 异常处理: callback 可以回传多个值
    // == throw new Error('Error');
    // == this.callback(new Error(), json, 2, 3, 4);

    // == 异步结果处理
    const callback = this.async();
    const imgs = source.match(/url\((\S*)\?__sprite\)/g);
    const matchedImgs = [];

    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite\)/)[1];
        matchedImgs.push(path.join(__dirname, `../src/${img}`));
    }

    const _this = this;
    Spritesmith.run({
        src: matchedImgs, // == ['../src/1.png', '../src/2.png'];
    }, function handleResult (err, result) {
        console.log(err, result);
        
        _this.emitFile(path.join(__dirname, '../dist/sprite.png'), result.image);
        source = source.replace(/url\((\S*)\?__sprite\)/g, match => `url(dist/sprite.png)`);
        _this.emitFile(path.join(__dirname, '../dist/index.css'), source);

        // == 处理后的结果返回给下一个 loader
        callback(err, source);
    });
}
