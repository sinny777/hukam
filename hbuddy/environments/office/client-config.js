/*global define */

// API_URL: 'http://granslive-web.mybluemix.net/api'
// API_URL: 'http://localhost:3000/api'

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('CONFIG', {
			VERSION: '0.1',
			ENVIRONMENT: 'LOCAL',
			API_URL: '//granslive-web.mybluemix.net/api',
			IOT_CONFIG:{
				"org": "rqeofj",
			    "id": "a-rqeofj-i7nm1fdo5d",
			    "authkey": "a-rqeofj-i7nm1fdo5d",
			    "authtoken": "3X0bTD*8tf4Q1rq12n",
			    "type": "shared"
			}
		});
    
});