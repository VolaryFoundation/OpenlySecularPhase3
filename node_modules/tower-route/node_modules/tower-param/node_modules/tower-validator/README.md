# Tower Validator

Minimal, extensible validation component.

## Installation

node.js:

```bash
$ npm install tower-validator
```

browser:

```bash
$ component install tower-validator
```

## Examples

```js
var validator = require('tower-validator');

validator('eq', function eq(a, b){
  return a === b;
});

validator('neq', function neq(a, b){
  return a !== b;
});

validator('gte', function gte(a, b){
  return a >= b;
});

validator('gt', function gte(a, b){
  return a > b;
});
```

## Testing

Install testem:

```bash
$ npm install -g testem
```

Run tests:

```bash
$ testem
```

Then, open all the browsers you want to test by going to the outputted url defaulted to [http://localhost:7357](http://localhost:7357)

Tests will run on any open browser linked to the stated url and your current Node environment.

## Contributing

Before you send a pull request, make sure your code meets the style guidelines at [https://github.com/tower/style-guide](https://github.com/tower/style-guide) and all tests pass.

## Licence

MIT