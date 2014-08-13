
if ('undefined' === typeof window) {
  var validator = require('..');
  var assert = require('assert');
} else {
  var validator = require('tower-validator');
  var assert = require('timoxley-assert');
}

describe('validator', function(){
  describe('property other than clear', function(){
    beforeEach(validator.clear);

    it('define', function(){
      var calls = [];

      validator.on('define', function(name, fn){
        calls.push(name);
      });

      validator('random', function random(a, b){
        return a === b;
      });

      assert(1 === validator.collection.length);
      assert(true === validator.has('random'));
      assert(1 === calls.length);
      assert('random' === calls[0]);
    });

    it('has', function(){
      validator('random', function(){});
      assert(true === validator.has('random'));
      assert(false === validator.has('random2'));
    });

    it('should scope to a namespace', function(){
      var attrValidator = validator.ns('attr');

      var calls = [];

      validator.on('define', function(name, fn){
        calls.push(name);
      });

      attrValidator('random', function eq(a, b){
        return a === b;
      });

      assert(1 === validator.collection.length);
      assert(true === validator.has('attr.random'));
      assert(false === validator.has('random'));
      assert(1 === calls.length);
      assert('attr.random' === calls[0]);
    });
  })

  it('should clear', function(){
    validator.on('define', function(){});
    assert(true === validator.hasListeners('define'));
    assert(0 < validator.collection.length);
    validator.clear();
    assert(false === validator.hasListeners('define'));
    assert(0 === validator.collection.length);
  });
});