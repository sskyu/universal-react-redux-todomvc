require('babel-core/register');

var env = process.env.NODE_ENV || 'development';

module.exports = require('./configs/webpack/' + env);

console.log();
console.log();
console.log('NODE_ENV: ', env);
console.log();
console.log();
