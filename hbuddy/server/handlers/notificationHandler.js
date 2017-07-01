
/**
 * Make sure app is provided while instantiating this class and calling any method
 */
module.exports = function(app) {

	var commonHandler = require('../../server/handlers/commonHandler')();
	var emailHandler = require('../../server/handlers/emailHandler')();
	var gcm = require('node-gcm');
	var Notification;
	var UserSetting;

	var methods = {};

	methods.sendNotification = function(payload, board, placeArea, device) {
		console.log('IN notificationHandler.sendNotification: >> ', device);
		var registrationIds = [];
		if(!Notification){
			Notification = app.models.Notification;
		}
		var findReq = {
    			  		 where: {"or": [{"and":[{"type": "DEVICE"}, {"typeId": device.deviceIndex}, {"typeValue": device.value}, {"typeParentId": device.parentId}]},
    			  		                {"and":[{"type": "PLACEAREA"}, {"typeValue": placeArea.id}]}]
    			  		 }
						};
		Notification.find(findReq, function(err, notifications) { 
			if(err){
				console.log("ERROR IN FINDING NOTIFICATIONS: >>> ", err);
				return;
			}
			var pushCount = 0;
			for (i = 0; i < notifications.length; i++) {
				var notification = notifications[i];
				if(notification.push){
					pushCount++;
					if(!UserSetting){
						UserSetting = app.models.UserSetting;
					}
					var count = 0;
					UserSetting.find({where:{"userId": notification.userId}}, function(err, userSettings) {
						count++;
						if(err){
							console.log("ERROR WHILE FETCHING USER SETTINGS: ", err);
						}else{
							registrationIds.push(userSettings[0].registrationId);
							if(pushCount == count){
								methods.handlePushNotification(payload, board, placeArea, device, registrationIds);
							}
						}
					});
				}
			}
		});
		
	};
	
	methods.handlePushNotification = function(payload, board, placeArea, device, registrationIds){
		var pushMsg = placeArea.title +"'s " + device.title + " status is changed to " + device.status +" at " +new Date();
		var pushData = {
				boardId : payload.d.boardId,
				deviceIndex : payload.d.deviceIndex,
				deviceValue : payload.d.deviceValue,
				style : "picture",
				picture : "http://wallpapercave.com/wp/3Ma6LaY.jpg"
			};
		
		methods.sendPushNotification(pushData, pushMsg, registrationIds);
	};

	methods.sendPushNotification = function(pushData, pushMsg, registrationIds) {
		console.log('IN notificationHandler.sendPushNotification: >> ', pushMsg);
		var apiKey = "AIzaSyD_dNyMIgJxxY82yjokjNPUdNCLVWQuzM8";
		var service = new gcm.Sender(apiKey);
		var message = new gcm.Message({
			priority : "high",
			sound : "default"
		});
		message.contentAvailable = true;
		message.delayWhileIdle = true;
		message.timeToLive = 3;
		message.dryRun = true;

		message.addData(pushData);

		message.addNotification({
			title : "GransLive Notification",
			icon : "ic_launcher",
			body : pushMsg,
			priority : 2,
			sound : "default"
		});

		service.send(message, {
			registrationTokens : registrationIds
		}, function(err, response) {
			if (err)
				console.error(err);
			else
				console.log(response);
		});
	};

	return methods;

}