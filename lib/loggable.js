'use strict'

function Loggable(key) {
    this.debugInfo = require('debug')(key + '_info');
    this.debugWarning = require('debug')(key + '_warning');
    this.debugError = require('debug')(key + '_error');

    this.debugInfo.log = console.info.bind(console);
    this.debugWarning.log = console.warn.bind(console);
    this.debugError.log = console.error.bind(console);

}

Loggable.prototype.debugInfo = null;
Loggable.prototype.debugWarning = null;
Loggable.prototype.debugError = null;

Loggable.prototype.info = function() {
    this.debugInfo.call(this, arguments);
}

Loggable.warning = function() {
    this.debugWarning.call(this, arguments);
}

Loggable.error = function() {
    this.debugError.call(this, arguments);
}

module.exports = Loggable;