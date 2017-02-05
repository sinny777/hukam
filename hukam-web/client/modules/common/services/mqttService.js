
define(['angular'], function (angular) {
    "use strict";

  var factory = function (CONFIG) {
    	
	var subscribeTopic = "";
	var mqttClient;
	var mqttOptions = {};
	var mqttConnected = false;
	
	var mqttService = {};
	
		mqttService.connectMQTT = function(options){
			
			if(mqttConnected){
				console.log("\n\n IN mqttService, MQTT Already Connected >>>>>>>>> \n\n");
				return false;
			}
			
			mqttOptions = options;
			mqttClient = new Paho.MQTT.Client(options.hostname, 8883, options.clientId);
			
			mqttClient.onMessageArrived = options.onMqttMessageArrived;
			mqttClient.onConnectionLost = function(e){
				console.log("Connection Lost at " + Date.now() + " : " + e.errorCode + " : " + e.errorMessage);
				mqttConnected = false;
				this.connect(connectOptions);
			}
			
			var connectOptions = new Object();
			connectOptions.keepAliveInterval = 3600;
			connectOptions.useSSL=true;
			connectOptions.userName=options.api_key;
			connectOptions.password=options.auth_token;

			connectOptions.onSuccess = function() {
				console.log("MQTT connected to host: "+mqttClient.host+" port : "+mqttClient.port+" at " + Date.now());
				mqttConnected = true;
				options.mqttConnectSuccess();
			}

			connectOptions.onFailure = function(e) {
				console.log("MQTT connection failed at " + Date.now() + "\nerror: " + e.errorCode + " : " + e.errorMessage);
				mqttConnected = false;
			}

			console.log("about to connect to " + mqttClient.host);
			mqttClient.connect(connectOptions);
			
	    };
	    
	    mqttService.subscribe = function(subscribeTopic, subscribeOptions){
	    	var unsubscribeOptions = {
					onSuccess : function() {
						console.log("First unsubscribed to " + subscribeTopic);
						mqttClient.subscribe(subscribeTopic, subscribeOptions);
					},
					onFailure : function(){
						console.log("Failed to unsubscribe to " + subscribeTopic);
						mqttClient.subscribe(subscribeTopic, subscribeOptions);
					}
		    	};
	    	mqttClient.unsubscribe(subscribeTopic, unsubscribeOptions);
	    	console.log("IN mqttService.subscribed to topic: " + subscribeTopic);
	    };
	    
	    mqttService.publishToMqtt = function(publishToTopic, msgToPublish){
	    	console.log('IN mqttClient.publishToMqtt, publishToTopic: ', publishToTopic, ', msgToPublish: ', msgToPublish);
	          var message = new Paho.MQTT.Message(JSON.stringify(msgToPublish));
	          message.destinationName = publishToTopic;
	          if(!mqttClient.host){
	              try{
	            	  mqttOptions.mqttConnectSuccess = function(){
	            		  mqttClient.send(msgToPublish);
	            	  };
	            	  mqttService.connectMQTT(mqttOptions);
	              }catch(err){
	                  console.log('Error: >>> ' +JSON.stringify(err));
	              }
	          }else{
	              try{
	                  mqttClient.send(message);
	                  console.log('MQTT Published Message: >>> ' +message);
	              }catch(err){
	                  console.log('Error in MQTT publish message: >>> ', err);
	              }

	          }
	    };
		
		return mqttService;
  }

	factory.$inject = ['CONFIG'];
	return factory;
});

