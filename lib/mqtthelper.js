'use strict'

const util = require('util');
const mqtt = require('mqtt');
const mqttRegex = require('mqtt-regex');
const Loggable = require('./loggable');

function MqttHelper() {
    Loggable.call(this, 'mqtt-helper');
};

util.inherits(MqttHelper, Loggable);

MqttHelper.prototype._mqttClient = null;
MqttHelper.prototype._subscribeList = [];

MqttHelper.prototype.connect = function(mqttHost, mqttConfigurations, callback) {
    callback = callback || this._defaultCallback.bind(this);

    if (!this._mqttClient) {
        try {
            this._mqttClient = mqtt.connect(mqttHost, mqttConfigurations);
            this._mqttClient.on('connect', function() {
                callback(null);
            });
            this._mqttClient.on('message', this._onMessage.bind(this));
        } catch(ex) {
            callback(ex);
        }
    } else {
        callback(null);
    }
};

MqttHelper.prototype.subscribe = function(topic, messageCallback, callback) {

    callback = callback || this._defaultCallback.bind(this);

    if (this._mqttClient && this._mqttClient.connected) {
        this._mqttClient.subscribe(topic, function(err, granted) {
            if (!err) {
                this._subscribeList.push({
                    topic: topic
                    , callback: messageCallback
                });
            }
            callback(err);
        }.bind(this));
    } else {
        callback(new Error('Mqtt client has not initialized!'));
    }
};

MqttHelper.prototype.publish = function(topic, payload, callback) {

    callback = callback || this._defaultCallback.bind(this);

    if (this._mqttClient && this._mqttClient.connected) {
        this._mqttClient.publish(topic, payload, { qos: 1 }, callback);
    } else {
        callback(new Error('Mqtt client has not initialized!'));
    }
};

MqttHelper.prototype._onMessage = function(topic, message) {
    for (let i = 0; i < this._subscribeList.length; i++) {
        let matched = mqttRegex(this._subscribeList[i].topic).regex.exec(topic);
        if (matched) {
            this._subscribeList[i].callback(topic, message.toString());
        }
    }
};

MqttHelper.prototype._defaultCallback = function(err) {
    if (err) {
        this.error(err);
    }
};

module.exports = MqttHelper;