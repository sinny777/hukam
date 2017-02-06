
var crypto = require('crypto');

module.exports = function() {
	
	var request = require('request'),
	CONFIG = require('../../common/config/config').get(),
	IOT_BASE_URI = ".internetofthings.ibmcloud.com/api/v0002/device/types/";
    
var methods = {};
  	
	methods.registerDevice = function(deviceObj, callback) {
		console.log("IN iotPlatformHAndler.registerDevice: >>>> ", deviceObj);
		try{
				var API_URL = "https://"+CONFIG.SERVICES_CONFIG.IOT_CONFIG.org;
				API_URL += IOT_BASE_URI;
				API_URL += deviceObj.typeId + "/devices";
				
				var device = {"deviceId": deviceObj.deviceId, "deviceInfo": deviceObj.deviceInfo};
				
				var options = {
						  url: API_URL,
						  method: "POST",
						  headers: {
						    "Content-Type": "application/json",
						    "Accept": "application/json"
						  },
						  "auth":{
							  "user": CONFIG.SERVICES_CONFIG.IOT_CONFIG.authkey,
							  "pass": CONFIG.SERVICES_CONFIG.IOT_CONFIG.authtoken
						  },
						  "json": true,
						  "body": device
						};
				console.log("IN iotPlatformHAndler.registerDevice: >>> Request options: >> ", options);
				
				request(options, function(error, response, body){
					if(callback){
						callback(error, response, body);
					}
				});
				
		}catch(err){
			if(callback){
				callback(err, null, null);
			}
		}
		
	};
	
	methods.updateDevice = function(deviceObj, callback){
		console.log("IN iotPlatformHAndler.updateDevice: >>> ", deviceObj);
		var API_URL = "https://"+CONFIG.SERVICES_CONFIG.IOT_CONFIG.org;
		API_URL += IOT_BASE_URI;
		API_URL += deviceObj.typeId + "/devices/";
		
		if(deviceObj.deviceId){
			API_URL += deviceObj.deviceId;
		}else{
			callback(new Error("Invalid Request, deviceId not found to update Device "), null, null);
			return;
		}
		
		var updateObj = {
				"deviceUpdate": {
					"deviceInfo": deviceObj.deviceInfo,
					"metadata": deviceObj.metadata,
					"status": deviceObj.status
				}
			}
		
		var options = {
				  url: API_URL,
				  method: "PUT",
				  headers: {
				    "Content-Type": "application/json",
				    "Accept": "application/json"
				  },
				  "auth":{
					  "user": CONFIG.SERVICES_CONFIG.IOT_CONFIG.authkey,
					  "pass": CONFIG.SERVICES_CONFIG.IOT_CONFIG.authtoken
				  },
				  "json": true,
				  "body": updateObj
				};
		
		request(options, function(error, response, body){
			if(callback){
				callback(error, response, body);
			}
		});
	};
	
    return methods;
    
}