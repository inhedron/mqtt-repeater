'use strict'

const util = require('util');
const Loggable = require('./lib/loggable');
const Repeater = require('./lib/repeater');

function Application() {
    Loggable.call(this, 'main');
    this._repeater = new Repeater();
    this.debugInfo("Initializing...");
    this._repeater.initialize(function(err) {
        if (err) {
            this.debugError("Application could not initialize!", err);
        } else {
            this.debugError("Application is running");
        }
    })
}

util.inherits(Application, Loggable);

Application.prototype._repeater = null;


// entry point of application!
var app = new Application();