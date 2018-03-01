# literalz
Extract literal contents from embedded literals

Embedded literals:
* May be a mix of single- or double-quoted
* May contain backslash-escaped delimiter

```js
var literalz = require('literalz');

var stringWithEmbeddedLiterals = "\"Bob's & Carol's\" & 'Ted\\'s & Alice\\'s'";
var sameString = '"Bob\'s & Carol\'s" & \'Ted\\\'s & Alice\\\'s\'';
console.log(stringWithEmbeddedLiterals === sameString); // true

var stringWithEmptyLiterals = literalz.extract(stringWithEmbeddedLiterals); // "\"\" & ''"
stringWithEmptyLiterals = stringWithEmptyLiterals.replace('&', 'and');
console.log(literalz.restore(stringWithEmptyLiterals)); // "\"Bob's & Carol's\" and 'Ted\'s & Alice\'s'"
```

### API

#### `literalz.extract(string)`
Extracts the literals to a private variable and returns a string with ASCII `NUL` (`'\0'`) chars as placeholders.

#### `literalz.restore(string)`
Returns a string with the `NUL`s replaced with the (most recently) extracted list of literals.

#### `literalz.litz`
Push-down list containing the stowed lists of literals. Pushed by `extract()`, popped by `restore`.
