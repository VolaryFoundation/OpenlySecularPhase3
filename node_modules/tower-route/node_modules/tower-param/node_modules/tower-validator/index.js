
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter');
var validators = require('./lib/validators');

/**
 * Expose `validator`.
 */

exports = module.exports = validator;

/**
 * All validators in the order they were defined.
 */

exports.collection = [];

/**
 * Get or set a validator function.
 *
 * @param {String} name
 * @param {Function} [fn]
 */

function validator(name, fn) {
  if (undefined === fn) return exports.collection[name];

  exports.collection[name] = fn;
  exports.collection.push(fn);
  exports.emit('define', name, fn);
  
  return fn;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Check if validator exists.
 *
 * @param {String} name
 */

exports.has = function(name){
  return !!exports.collection[name];
};

/**
 * Scope validators to a namespace.
 */

exports.ns = function(ns){
  return function validator(name, fn) {
    return exports(ns + '.' + name, fn);
  }
};

/**
 * Remove all validators.
 */

exports.clear = function(){
  var collection = exports.collection;

  exports.off('define');
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      delete collection[key];
    }
  }
  collection.length = 0;
  return exports;
};

validators(exports);