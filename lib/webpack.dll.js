
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
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(projectRoot, 'build/library/[name].json')
        })
    ],
};
