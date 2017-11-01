'use strict'

const util = require('util');
const mqtt = require('mqtt');
const async = require('async');

const MqttHelper = require('./mqtthelper');
const Loggable = require('./loggable');
const config = require('../config');

function Repeater() {
    Loggable.call(this, 'repeater');
}

util.inherits(Repeater, Loggable);

Repeater.prototype._sourceMqtt = null;
Repeater.prototype._targetMqtt = null;

Repeater.prototype.initialize = function(callback) {

    callback = callback || this._defaultCallback.bind(this);

    try {

        let sourceConfiguration = JSON.parse(config.SOURCE_MQTT_CONF);
        let targetConfiguration = JSON.parse(config.TARGET_MQTT_CONF);
        let subscriptions = JSON.parse(config.SUBSCRIPTIONS);

        async.series([

            function(callback) {
                if (!this._sourceMqtt) {
                    this._sourceMqtt = new MqttHelper();
                    this._sourceMqtt.connect(config.SOURCE_MQTT_HOST, sourceConfiguration, callback);
                }
            }.bind(this),

            function(callback) {
                if (!this._targetMqtt) {
                    this._targetMqtt = new MqttHelper();
                    this._targetMqtt.connect(config.TARGET_MQTT_HOST, targetConfiguration, callback);
                }
            }.bind(this),

            function(callback) {
                async.each(subscriptions, function(topic, callback) {
                    this._sourceMqtt.subscribe(topic, this._onMessage.bind(this));
                }, callback);
            }.bind(this)

        ], callback);
        
    } catch(ex) {
        callback(ex);
    }
};

Repeater.prototype._onMessage = function(topic, message) {
    if (this._targetMqtt) {
        this._targetMqtt.publish(topic, message);
    }
};

Repeater.prototype._defaultCallback = function(err) {
    if (err) {
        this.debugError(err);
    }
};

module.exports = Repeater;