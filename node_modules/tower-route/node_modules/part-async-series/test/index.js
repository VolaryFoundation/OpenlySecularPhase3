var series = 'undefined' == typeof window
  ? require('..')
  : require('async-series'); // how to do this better?

var assert = require('assert');

describe('async-series', function(){
  it('should handle sync', function(done){
    var calls = [];

    var a = function(context){
      calls.push('a.' + context);
    }
    var b = function(context){
      calls.push('b.' + context);
    }

    series([a, b], 'ctx', function(){
      assert('a.ctx' === calls[0]);
      assert('b.ctx' === calls[1]);
      done();
    });
  });

  it('should handle async', function(done){
    var calls = [];

    var a = function(context, next){
      setTimeout(function(){
        calls.push('a.' + context);
        next();
      }, 1);
    }
    var b = function(context, next){
      setTimeout(function(){
        calls.push('b.' + context);
        next();
      }, 1);
    }

    series([a, b], 'ctx', function(){
      assert('a.ctx' === calls[0]);
      assert('b.ctx' === calls[1]);
      done();
    });
  });

  it('should support custom binding', function(done){
    var bindings = [];
    var binding = {};
    var a = function(context){
      bindings.push(this);
    }
    var b = function(context){
      bindings.push(this);
    }

    series([a, b], null, function(){
      assert(binding === bindings[0]);
      assert(binding === bindings[1]);
      done();
    }, binding);
  });
});