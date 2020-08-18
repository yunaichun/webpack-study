
const path = require('path');
const webpack = require('webpack');

const projectRoot = process.cwd();

module.exports = {
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.join(projectRoot, 'build/library'),
        library: '[name]',
        // pathinfo: true,
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(projectRoot, 'build/library/[name].json'),
            // context: path.resolve(projectRoot, 'build', 'library'), // ==  必填，不然在 web 网页中找不到 [name]，会报错
        })
    ],
};
