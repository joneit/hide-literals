# literalz
Extract embedded literals

Embedded literals:
* May be a mix of single- and double-quoted
* May contain backslash-escaped delimiter

## Usage
```js
var Literalz = require('literalz');
var x = new Literalz('He said, "She said." You said, \'\\\'nuf said.\'');
console.log(x.original); // He said, "She said." You said, '\'nuf said.'
console.log(x.replace(/said/g, 'cried').inject()); // He cried, "She said." You cried, '\'nuf said.'
```
After the above, `console.log(x)` produces this:
```text
Literalz
  extract: "He cried, "" You cried, ''"
  extractions: ["She said.", "\'nuf said."]
  original: "He said, "She said." You said, '\'nuf said.'"
  __proto__:
    inject: ƒ ()
    replace: ƒ (a, b)
    constructor: ƒ Literalz(s)
```

## API

### Constructor

#### `new Literalz(string)`
Sets `this.original` and `this.extract` (see).

### Methods

#### `literalz.inject(string)` (method)
Returns a string with the extractions injected into the empty literals.

#### `literalz.replace(RegExp|string, string)`
Runs `String.prototype.replace` on `this.extract`. Returns `literalz` for chaining.

### Properties

#### `literalz.original` (string)
The original string provided to the constructor.

#### `literalz.extract` (string)
The original string with literal contents removed (quotes remain)

#### `literalz.extractions` (string array)
The extracted contents of all the literals.
