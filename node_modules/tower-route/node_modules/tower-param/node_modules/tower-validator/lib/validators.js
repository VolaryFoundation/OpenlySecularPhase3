
/**
 * Module dependencies.
 */

var indexof = require('indexof');

/**
 * Expose `validators`.
 */

module.exports = validators;

/**
 * Define basic operators/validators.
 */

function validators(validator) {
  validator('eq', function eq(a, b){
    return a === b;
  });

  validator('neq', function neq(a, b){
    return a !== b;
  });

  validator('contains', function contains(a, b){
    return !!~indexof(b, a);
  });

  validator('in', validator('contains'));

  validator('excludes', function nin(a, b){
    return !~indexof(b, a);
  });

  validator('nin', validator('excludes'));

  validator('gte', function gte(a, b){
    return a >= b;
  });

  validator('gt', function gt(a, b){
    return a > b;
  });

  validator('lte', function gte(a, b){
    return a <= b;
  });

  validator('lt', function gt(a, b){
    return a < b;
  });

  validator('match', function match(a, b){
    return !!a.match(b);
  });
}