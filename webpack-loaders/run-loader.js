const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    // == 入口资源绝对路径
    resource: path.join(__dirname, './src/demo.txt'),
    // == loaders 绝对路径
    loaders: [
        {
            loader: path.join(__dirname, './loaders/raw-loader.js'),
            options: {
                name: 'test',
            },
        }
    ],
    // == 提供额外的上下文信息
    context: {
        emitFile: () => {},
    },
    // == 读取文件方法
    readResource: fs.readFile.bind(fs),
}, (err, result) => {
    err ? console.log(err) : console.log(result);
});
