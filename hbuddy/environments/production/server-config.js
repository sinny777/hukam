/**
 * Server Configuration for Production
 */
'use strict';

module.exports.get = function() {
		return {
			"gatewayId": "000000001x2xx34y",
			"CLOUD_CONFIG": {
		      "org": "rqeofj",
		      "id": "a-rqeofj-i7nm1fdo5d",
		      "authkey": "a-rqeofj-i7nm1fdo5d",
		      "authtoken": "3X0bTD*8tf4Q1rq12n",
		      "type": "shared"
		    },
		    "SERVICES_CONFIG":{
		    	"IOT_CONFIG":{
		    		"org": "rqeofj",
				    "id": "a-rqeofj-i7nm1fdo5d",
				    "authkey": "a-rqeofj-i7nm1fdo5d",
				    "authtoken": "3X0bTD*8tf4Q1rq12n",
				    "type": "shared"
		    	},
				"cloudantNOSQLDB":{
					 "username": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix",
					  "password": "5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13",
					  "host": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com",
					  "port": 443,
					  "url": "https://acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix:5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13@acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com"
				},
				"stt":{
					"url": "https://stream.watsonplatform.net/text-to-speech/api",
					"password": "xGaXXN1sHQNE",
					"username": "d1ea6af9-ca33-43c6-a85d-572257ff6a64"
				},
				"conversation":{
					"credentials":{
						"url": "https://gateway.watsonplatform.net/conversation/api",
						"password": "Dd6zArf1tY05",
						"username": "7374796d-9f99-4e50-92f4-b4c5f5ce7e59",
						"version_date": "2016-09-20",
						"version": "v1-experimental",
						"silent": true
					},
					"workspace_id": "ccc639e8-9b25-4226-8611-1f4386000344"
				},
				"alchemy": {
					  "url": "https://gateway-a.watsonplatform.net/calls",
					  "apikey": "90847a470740824a0fe97f42681e7c98285b7962"
				}
			}
		}
    	
};