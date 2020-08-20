// Load in dependencies
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

module.exports = function (source) {
    const callback = this.async();
    const imgs = source.match(/url\((\S*)\?__sprite\)/g);
    const matchedImgs = [];

    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite\)/)[1];
        matchedImgs.push(path.join(__dirname, `../src/${img}`));
    }

    const _this = this;
    Spritesmith.run({
        src: matchedImgs, // ==  ['../src/1.png', '../src/2.png'];
    }, function handleResult (err, result) {
        console.log(err, result);
        
        _this.emitFile(path.join(__dirname, '../dist/sprite.png'), result.image);
        source = source.replace(/url\((\S*)\?__sprite\)/g, match => `url(dist/sprite.png)`);
        _this.emitFile(path.join(__dirname, '../dist/index.css'), source);
        callback(err, source);
    });
}
