module.exports = function(source) {
    console.log('Loader B is excuted!');
    console.log('Loader A source is: ', source);

    return source;
}
