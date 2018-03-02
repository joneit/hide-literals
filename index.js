'use strict';

var openQuote = /["']/;
var closeQuote = {
    '"': /[^\\]"/,
    "'": /[^\\]'/
};
var emptyQuotes = /''|""/g;

function Literalz(s) {
    var i, j, qt;

    this.original = s;

    this.extractions = [];

    for (var i = 0; (j = s.substr(i).search(openQuote)) >= 0; i++) {
        i += j;
        qt = s[i++];
        j = s.substr(i).search(closeQuote[qt]);
        if (j < 0) {
            // closed quote not found
            break;
        }
        this.extractions.push(s.substr(i, ++j)); // stow literal contents sans quotes
        s = s.substr(0, i) + s.substr(i + j); // literal contents removed
    }

    this.extract = s;
}

// This is for chaining purposes, e.g., `(new Literalz('...').replace(...).replace(...).inject()`
Literalz.prototype.replace = function(a, b) {
    this.extract = this.extract.replace(a, b);
    return this;
}

Literalz.prototype.inject = function() {
    var i = 0, extractions = this.extractions;
    return this.extract.replace(emptyQuotes, function (match) {
        return match[0] + extractions[i++] + match[1];
    });
};

module.exports = Literalz;
