
/**
 * Make sure app is provided while instantiating this class and calling any method
 */
module.exports = function(app) {
	
	var notificationHandler = require('../../server/handlers/notificationHandler')(app);
	var Device;
	var Board;
	var PlaceArea;
	
	var bluemix = require('../../common/config/bluemix');
	var dbCredentials = bluemix.getServiceCreds('cloudantNoSQLDB');
	var cloudant = require('cloudant')(dbCredentials.url);
    
var methods = {};

	methods.handleDeviceEvent = function(deviceType, deviceId, eventType,
			format, payload){
		console.log('\n\nIN deviceHandler.handleDeviceEvent with payload: >>>> ', payload);
		try {
			var jsonPayload = JSON.parse(payload);
			methods.handleDevicePayload(jsonPayload);
		} catch (err) {
			// TODO: Handle Invalid Payload
		}
	};
	
	methods.deviceChangeTrigger = function(payload){
		console.log("IN deviceHandler.deviceChangeTrigger: >>> ", payload);
		var msg = {};
		if(payload && payload.message){
			try{
				msg = JSON.parse(payload.message);
				methods.handleDevicePayload(msg);
			}catch(err){
				console.log('ERROR in Parsing Payload Message: >> ', err );
				msg = payload.message;
			}
		}
	};
	
	methods.sensorDataTrigger = function(payload){
		console.log("IN deviceHandler.sensorDataTrigger: >>> ", payload);
		var msg = {};
		if(payload && payload.message){
			try{
				msg = JSON.parse(payload.message);
				methods.handleDevicePayload(msg);
			}catch(err){
				console.log('ERROR in Parsing Payload Message: >> ', err );
				msg = payload.message;
			}
		}
	};
	
	methods.handleDevicePayload = function(payload){
		console.log('IN deviceHandler.handleDevicePayload with payload: >>>> ', payload);
		if(payload.d.boardId){
			if(payload.d.gatewayId){
				methods.findBoard(payload.d.boardId, payload.d.gatewayId, function(err, boards) { 
					if(err){
						console.log("ERROR IN finding Board with uniqueIdentifier: ", payload.d.boardId, err);
					}else{
						if(boards && boards.length > 0){
							var board = boards[0];
							console.log("RESP FROM FIND BOARD: >>> ", board.title);
							methods.saveDeviceData(payload, board);
						}else{
							console.log("NO BOARDS FOUND FOR PAYLOAD: ", payload);
						}						
					}
				});
			}
		}
	};
	
	methods.findBoard = function(boardId, gatewayId, cb){
		try{
			if(boardId){
				if(gatewayId){
					var findReq =  {where: {"uniqueIdentifier": boardId}};
					console.log('IN findBoard, with boardId: ', boardId, ", gatewayId: ", gatewayId, ', findReq: ', findReq);
					if(!Board){
						Board = app.models.Board;
					}
					Board.find(findReq, function(err, resp) { 
						cb(err, resp);
					});
				}else{
					cb("gatewayId can not be null", null);
				}
			}else{
				cb("boardId can not be null", null);
			}
		}catch(err){
			console.log(err);
			cb("Some Error in findBoard: " +err, null);
		}
	};
	
	methods.findPlacesForGatewayId = function(gatewayId, cb){
		console.log('IN findPlaceAreasForGatewayId with gatewayId: ', gatewayId);
		var findReq =  {where: {"gatewayId": gatewayId}};
		if(!Place){
			Place = app.models.Place;
		}
		Place.find(findReq, function(err, resp) { 
			cb(err, resp);
		});
	};
	
	methods.findPlaceAreasForPlaceId = function(placeId, cb){
		console.log('IN findPlaceAreasForPlaceId with placeId: ', placeId);
		var findReq =  {where: {"placeId": placeId}};
		if(!PlaceArea){
			PlaceArea = app.models.PlaceArea;
		}
		PlaceArea.find(findReq, function(err, resp) { 
			cb(err, resp);
		});
	};
	
	methods.findPlaceArea = function(placeAreaId, cb){
		console.log('IN findPlaceArea with placeAreaId: ', placeAreaId);
		if(!PlaceArea){
			PlaceArea = app.models.PlaceArea;
		}
		PlaceArea.findById(placeAreaId, function(err, resp) { 
			cb(err, resp);
		});
	};
	
	methods.saveDeviceData = function(payload, board){
		for (i = 0; i < board.devices.length; i++) {
		    var device = board.devices[i];
		    if(device.deviceIndex == payload.d.deviceIndex){
		    	board.devices[i].value = payload.d.deviceValue;
		    	
		    	if(payload.d.deviceValue == 1){
		    		board.devices[i].status = "ON";
		    	}else{
		    		board.devices[i].status = "OFF";
		    	}
		    	
		    	if(payload.d.analogValue){
		    		board.devices[i].analogValue = payload.d.analogValue;
		    	}
		    	
		    	board.devices[i].updatedAt = new Date();
		    	
		    	Board.upsert(board, function(err, updatedBoard){
		    		if(err){
		    			console.log("ERROR IN UPDATING BOARD: >> ", err);
		    		}else{
		    			console.log("<<<< BOARD DEVICE UPDATED SUCCESSFULLY >>>>>>> ", board.devices[i]);
		    		}
		    	});
		    	
		    	if(board.connectedToType == "PlaceArea" && board.connectedToId){
		    		methods.findPlaceArea(board.connectedToId, function(err, placeArea) { 
						if(err){
							console.log("ERROR IN finding PlaceArea with ID: ", board.placeAreaId, err);
						}else{
							console.log("RESP FROM FIND PLACEAREA: >>> ", placeArea.title);
							if(placeArea){
								notificationHandler.sendNotification(payload, board, placeArea, board.devices[i]);
							}
						}
					});
		    	}else{
		    		console.log("In deviceHandler, BOARD CAN NOT BE SAVED: >>> ", board);
		    	}
		    	
		    	break;
		    }
		}
	};
	
	methods.getLatestSensorData = function(params, cb){
		var startKey = [];
		startKey.push(params.gatewayId);
		startKey.push(params.uniqueId);
		startKey.push(params.type);
		startKey.push({});
		var reqParams = {
			descending: params.descending,
			startkey: startKey,
			limit: params.limit
		  };
		console.log("reqParams: >>> ", reqParams);
		var db = cloudant.use(methods.getLatestSensorDataBucket());
		db.view('iotp', 'sensordata-view', reqParams, function(err, resp) {
			  if (!err) {
				var result = [];
			    if(resp.rows && resp.rows.length > 0){
			    	for(var index in resp.rows) { 
						  var viewData = resp.rows[index];
						  if(viewData.value && viewData.value.length > 0){
							  var sensorData = {};
							  sensorData = viewData.value[0].data.d;
							  result.push(sensorData);
						  }
			    	}
			    	cb(null, result);
			    }else{
			    	cb(null, result);
			    }
			  }else{
				  console.log('ERROR IN CALLING getLatestSensorData: ', err);
				  cb(err, null);
			  }
		});
		
	};
	
	methods.getLatestSensorDataBucket = function(){
		var today = new Date();
		
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		if(month < 10){
			month = "0"+month;
		}
		
		var deviceDataBucket = "iotp_o6oosq_devicelogs_"+year+"-"+month;
		return deviceDataBucket;
	};
	
	
    return methods;
    
}