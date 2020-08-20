const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const {name} = loaderUtils.getOptions(this);
    console.log('loader option params is:', name);

    const json = JSON.stringify(source)
        .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

        
    // == loader 异常处理
    // throw new Error('Error');
    // this.callback(null, json, 2, 3, 4); // == 可以回传多个值
    return `export default ${json}`;
}
