module.exports = function(fns, val, done, binding){
  var i = 0, fn;

  function handle(err) {
    if (err) return done(err);
    next();
  }

  function next() {
    if (fn = fns[i++]) {
      if (2 === fn.length) {
        fn.call(binding, val, handle);
      } else {
        if (false === fn.call(binding, val))
          done(new Error('haulted'));
        else
          next();
      }
    } else {
      if (done) done();
    }
  }

  next();
}