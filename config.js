module.exports = {

    /**
     * SOURCE_MQTT_HOST
     * The ip or host name of source broker
    */
    SOURCE_MQTT_HOST:   process.env.SOURCE_MQTT_HOST || 'mqtt://broker',


    /**
     * SOURCE_MQTT_CONF
     * The configuration of source broker
     */
    SOURCE_MQTT_CONF:   process.env.SOURCE_MQTT_CONF || '{"clean": false, "port": 1885, "clientId": "mqtt-repeater-source-client"}',

    /**
     * TARGET_MQTT_HOST
     * The ip or host name of source broker
    */
    TARGET_MQTT_HOST:   process.env.TARGET_MQTT_HOST || 'mqtt://broker',
    
    
    /**
     * TARGET_MQTT_CONF
     * The configuration of source broker
     */
    TARGET_MQTT_CONF:   process.env.TARGET_MQTT_CONF || '{"clean": false, "port": 1883, "clientId": "mqtt-repeater-target-client"}',

    /**
     * SUBSCRIPTIONS
     * subscribe list to exchange
     */
    SUBSCRIPTIONS: process.env.SUBSCRIPTIONS || '["#"]'


};


