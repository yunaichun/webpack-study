const loaderUtils = require('loader-utils');
module.exports = function(source) {
    const {name} = loaderUtils.getOptions(this);
    console.log('loader option params is:', name);

    const json = JSON.stringify(source)
        .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    return `export default ${json}`;
}
