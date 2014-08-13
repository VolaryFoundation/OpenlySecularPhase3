# Async Series

## Installation

node.js:

```bash
npm install part-async-series
```

browser:

```bash
component install part/async-series
```

## Example

```js
var series = require('part-async-series');

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
```

## Licence

MIT