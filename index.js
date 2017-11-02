'use strict'

const util = require('util');
const Loggable = require('./lib/loggable');
const Repeater = require('./lib/repeater');

function Application() {
    Loggable.call(this, 'main');
    this.info("Initializing...");
    this._repeater = new Repeater();
    this._repeater.initialize(function(err) {
        if (err) {
            this.error("Application could not initialize!", err);
        } else {
            this.info("Application is running");
        }
    }.bind(this));
}

util.inherits(Application, Loggable);

Application.prototype._repeater = null;


// entry point of application!
var app = new Application();