module.exports = function(source) {
  console.log('Loader A is excuted!');
  console.log('Loader A source is: ', source);

  return source;
}
