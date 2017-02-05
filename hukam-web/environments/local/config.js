/*global define */

// API_URL: 'https://granslive-web.mybluemix.net/api'
// API_URL: 'http://localhost:3000/api'

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('CONFIG', {
			VERSION: '0.1',
			ENVIRONMENT: 'LOCAL',
			API_URL: '//localhost:3000/api',
			IOT_CONFIG:{
				"org": "o6oosq",
			     "id": "a-o6oosq-v9xbyockrk",
			     "auth_key": "a-o6oosq-ugylh9r4ug",
			     "auth_token": "Tun&)vjKlf6sJ_9BdK"
			},
			MQTT: {
				MQTT_BROKER: '52.76.33.2',
				PORT: 9001,
				TOPIC_PREFIX: 'granslive/iot/'
			}
		});
    
});