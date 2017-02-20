define(function () {
    'use strict';

  function ctrl($rootScope, $scope, CONFIG, authService, mqttService, dataService, iotService){
	  
	  $scope.memberships = [];
	  $scope.places = [];
	  $scope.selectedPlace = {floor: 'Ground'};
	  $scope.display = 'places';
	  $scope.selectedPlaceArea = {};
	  $scope.newboard = {};
	  $scope.isMqttConnected = false;
	  $scope.mqttOptions = {api_key: CONFIG.IOT_CONFIG.authkey, 
			  				auth_token: CONFIG.IOT_CONFIG.authtoken,
			  				orgId: CONFIG.IOT_CONFIG.org,
			  				clientId: "a:"+CONFIG.IOT_CONFIG.org+":" +Date.now(),
			  				hostname: CONFIG.IOT_CONFIG.org+".messaging.internetofthings.ibmcloud.com"};
	  
	  $scope.placeAreaTypes = ['livingroom', 'bedroom', 'bathroom', 'kitchen', 'store', 'gallery', 'parking', 'balcony', 'other'];
	  $scope.floors = ['Ground'];
	  $scope.deviceTypes = [];
	  
	  /*
	  $scope.$watch(
              "selectedPlace",
              function handlePlaceChanged(newValue, oldValue ) {
                  console.log( "selectedPlace newValue:", newValue);
                  if(newValue.id){
                	  $scope.handlePermissions();
                	  mqttService.connectToMqtt($scope.onMqttMessageArrived, $scope.onMqttConnectionLost, $scope.mqttConnectSuccess);
                  }
              }
          );
	  */
	  
	  $scope.initPlacesPage = function(){
		  console.log('IN initPlacesPage for User >>>>>>>>>> ', $rootScope.currentUser);
		  $rootScope.checkUser(function(currentUser){
			  $rootScope.currentUser = currentUser;
			  if(!$rootScope.currentUser){
		    		return;
		    	}
			  
		    	$scope.ownerId = $rootScope.currentUser.id;
		    	if($rootScope.currentUser.userId){
		    		$scope.ownerId = $rootScope.currentUser.userId;
		    	}
			  
			  $scope.floors = ['Ground'];
			  for(var i = 1; i <= 150; i++){
				  $scope.floors.push(''+i);
			  }
			  if($scope.places.length == 0){
				  $scope.fetchMyMembership();
			  }
		  });
		  
		  $scope.deviceTypes = dataService.getValue("deviceTypes", function(data){
			  $scope.deviceTypes = data;
			  console.log("DeviceTypes: >>> ", $scope.deviceTypes);
		  });
		  
	  };
	  
	  $scope.handlePermissions = function(){
		  
		  if(!$rootScope.currentUser.permissions){
			  $rootScope.currentUser.permissions = {};
		  }
		  
		  if($scope.selectedPlace.id){
			  $rootScope.currentUser.permissions.placeOwner = $scope.selectedPlace.ownerId == $scope.ownerId;
		  }
	  };
	  
	  $scope.mqttConnectSuccess = function(){
   	   console.log('MQTT Connection SUCCESS >>>>>>>>>>');
   	   
   	   if(!$scope.selectedPlace.gatewayId){
   		   console.log("This place has not installed any Gateway Yet !!! ");
   		   return false;
   	   }
   	   
	   	try{
	   		  $scope.isMqttConnected = true;
					var subscribeTopic = "iot-2/type/" +CONFIG.IOT_CONFIG.gatewayType +"/id/" +$scope.selectedPlace.gatewayId + "/evt/+/fmt/json";
			    	var subscribeOptions = {
						qos : 0,
						onSuccess : function() {
							console.log("subscribed to " + subscribeTopic+", gatewayId: "+$scope.selectedPlace.gatewayId);
						},
						onFailure : function(){
							console.log("Failed to subscribe to " + subscribeTopic);
						}
			    	};
			    	console.log('SUBSCRIBE TO TOPIC: >>> ', subscribeTopic);
			    	mqttService.subscribe(subscribeTopic, subscribeOptions);
		   }catch(err){
			   console.log('Error in MQTT Subscribing: >>> ', err);
		   }
      };
	  
	  $scope.onMqttMessageArrived = function(message) {
   	   console.log('onMqttMessageArrived >>>>>>>>>>' +message.payloadString);
          try{
        	  var msg = JSON.parse(message.payloadString);
        	  $scope.refreshSelectedPlace(msg);
          }catch(err){
              console.log(err);
          }
      };
      
      $scope.refreshSelectedPlace = function(mqttMsg){
    	  console.log('IN refreshSelectedPlace, mqttMsg: ', mqttMsg);
    	  
    	  if($scope.selectedPlace && $scope.selectedPlace.placeAreas){
    		  for(var i = 0; i < $scope.selectedPlace.placeAreas.length; i++){
        		  var placeArea = $scope.selectedPlace.placeAreas[i];
        		  if(placeArea.boards){
        			  for(var j = 0; j < placeArea.boards.length; j++){
                		  var board = placeArea.boards[j];
                		  if(board.devices){
                			  for(var k = 0; k < board.devices.length; k++){
                        		  var device = board.devices[k];
                        		  if(device.parentId == mqttMsg.d.boardId && device.deviceIndex == mqttMsg.d.deviceIndex){
                        			  console.log("Change in Device: ", device);
                        		           device.value = mqttMsg.d.deviceValue;
                             			   if(device.value == 0){
                             				   device.status = "OFF";
                             			   }else{
                             				   device.status = "ON";
                             			   }
                             			   
                             			   if(mqttMsg.d.analogValue){
                             				  device.analogValue = mqttMsg.d.analogValue;
                             			   }
                             			   
                             			   device.updatedAt = new Date();
                             			   
                             			   console.log("DEVICE UPDATED>> ", device);
                             			   $scope.$apply();
                             			   $rootScope.$apply();
//                        		      break;
                        		   }
                			  }
                		  }
            		  } 
        		  }
    		  }  
    	  }
    	  
      };
      
	  $scope.showAddNewPlacePanel = function(){
		  console.log('IN showAddNewPlacePanel: ');
		  $scope.selectedPlace = {floor: 'Ground'};
		  $scope.display = "savePlacePanel";
	  };
	  
	  $scope.showUpdatePlacePanel = function(){
		  console.log('IN showUpdatePlacePanel: ');
		  $scope.display = "savePlacePanel";
	  };
	  
	  $scope.showPlaces = function(){
		  console.log('IN showPlaces: ');
		  if($scope.places.length == 0){
			  $scope.fetchMyMembership();
		  }if($scope.places.length == 1){
			  $scope.selectedPlace = $scope.places[0];
			  $scope.showDashboard();
		  }else{
			  $scope.display = "places";
		  }
	  };
	  
	  $scope.showDashboard = function(){
		  console.log('IN showDashboard: ');
		  $scope.selectedPlaceArea = {};
		  $scope.display = "dashboard";
	  };
	  
	  $scope.showScenes = function(){
		  console.log('IN showScenes: ');
		  $scope.display = "scenes";
	  }
	  
	  $scope.showAddNewPlaceAreaPanel = function(){
		  console.log('IN showAddNewPlaceAreaPanel: ');
		  $scope.selectedPlaceArea = {};
		  $scope.display = "savePlaceAreaPanel";
	  };
	  
	  $scope.showUpdatePlaceAreaPanel = function(placeArea){
		  console.log('IN showUpdatePlaceAreaPanel: ');
		  $scope.selectedPlaceArea = placeArea;
		  $scope.display = "savePlaceAreaPanel";
	  };
	  
	  $scope.showDashBoardForPlace = function(place){
		  console.log('IN showDashBoardForPlace: ', place);
		  $scope.selectedPlace = place;
		  $scope.showDashboard();
	  };
	  
	  $scope.showGroups = function(){
		  console.log('IN showGroups: ');
		  $scope.display = "groups";
	  };
	  
	  $scope.fetchMyMembership = function(){
	    	console.log('IN fetchMyMembership for User >>>>>>>>>> ', $rootScope.currentUser);
	    	
	    	var email = $rootScope.currentUser.profile && $rootScope.currentUser.profile.email;
	    	if(!email){
	    		email = $rootScope.currentUser.email;
	    	}
	    	
	    	var findReq = {
	    					filter:{
			    			  		 where: {"or": [{"members": {"elemMatch": {"username": {"$eq": email}}}},
			    			  		                {"ownerId":$scope.ownerId}]}
	    				   		   }
	    					};
	    	console.log('findReq: >>> ', findReq);
	    	$rootScope.loadingScreen.show();
	    	iotService.findGroups(findReq,
	  			  function(errResp, list) { 
			    		$rootScope.loadingScreen.hide();
	    				if(errResp){
	   	  				  	$scope.fetchMyPlaces();
	    				}
	    			  console.log('RESPONSE of GROUP.find: >>>>> ', list);
	  				  $scope.memberships = list;
	  				  $rootScope.loadingScreen.hide();
	  				  $scope.fetchMyPlaces();
	  			  });
	    	
	    };
	  
    $scope.fetchMyPlaces = function(){
    	console.log('IN fetchMyPlaces for User >>>>>>>>>> ', $rootScope.currentUser);
    	console.log('MEMBERSHIPS: >>>> ', $scope.memberships);
    	var findReq = {filter: {where: {or: [{ownerId: $scope.ownerId}]}}};
    	var placeIds = [];
		  angular.forEach($scope.memberships, function(membership) {
			  placeIds.push(membership.placeId);
			});
		if(placeIds.length > 0){
			findReq.filter.where.or.push({id: {inq: placeIds}});
		} 
    	console.log(findReq);
    	$rootScope.loadingScreen.show();
    	$scope.places = iotService.findPlaces(findReq,
    			  function(errResp, list) { 
    				  $rootScope.loadingScreen.hide();
    				  if(errResp){
    					  return;
    				  }
    				  $scope.places = list;
    				  $scope.display = 'places';
    				  if($scope.places && $scope.places.length == 1){
						  $scope.selectedPlace = $scope.places[0];
						  console.log("RESP:>>> ", errResp, ", selectedPlace: ", $scope.selectedPlace);
						  $scope.fetchPlaceAreas();
						  $scope.fetchPlaceSensorsData();
						  $scope.fetchConnectedBoards();
						  $scope.display = "dashboard";
					  }else{
						  angular.forEach($scope.places, function(place) {
	    					  console.log('PLACE FETCHED: >>>> ', place);
	    					  if(place.isDefault){
	    						  $scope.selectedPlace = place;
	    						  $scope.display = "dashboard";
	    						  $scope.fetchPlaceAreas();
	    					  }
	    					});
					  }  				  
    			  });
    };
    
    $scope.fetchPlaceSensorsData = function(){
    	if($scope.selectedPlace && $scope.selectedPlace.id){
    		var sensorDataReq = {
	    				"gatewayId": $scope.selectedPlace.gatewayId,
	    				"descending": true,
	    				limit: 1
    				};
    		
    		var findReq = {
					filter:{
	    			  		 where: {"and": [{"connectedToId": $scope.selectedPlace.id},
	    			  		                {"connectedToType": "Place"},
	    			  		                {"type": "SENSOR_BOARD"}
	    			  		 				]}
									}
    						};
//    		var findReq = {filter: {where: {connectedToId: $scope.selectedPlace.id}}};
    		iotService.findBoards(findReq,
      			  function(errResp, sensors) { 
    					if(errResp){
    						return;
    					}
	    				  console.log("SENSOR BOARD FETCHED: >>> ", sensors);
	    				  angular.forEach(sensors, function(sensor) {
	    	    			  sensorDataReq.type = sensor.subType;
	    	    			  sensorDataReq.uniqueId = sensor.uniqueIdentifier;
	    	    			  
	    	    			  iotService.fetchSensorsData(sensorDataReq,
	    	    	    			  function(errResp2, resp) { 
	    	    				  			if(errResp2){
	    	    				  				return;
	    	    				  			}
	    	    				  			console.log("RESPONSE OF fetchSensorsData: >>> ", resp);
	    	    	    			  });
	    	    			});
      			  	});
    	}
    };
    
    $scope.savePlace = function(){
    	$scope.selectedPlace.ownerId = $rootScope.currentUser.userId;
    	
    	var areas = $scope.selectedPlace.placeAreas;
    	delete $scope.selectedPlace["placeAreas"];
    	
    	$rootScope.loadingScreen.show();
    	$scope.selectedPlace = iotService.save($scope.selectedPlace,
		  function(errResp, place) { 
    		$rootScope.loadingScreen.hide();
    		if(errResp){
  			  	$scope.selectedPlace.placeAreas = areas;
  			  	$scope.showPlaces();
  			  	return;
    		}
			$scope.selectedPlace = place;
			console.log('PLACE SAVED: >>>> ', place);
			$scope.selectedPlace.placeAreas = areas;
			$scope.showPlaces();
		  });
    };
    
    $scope.deletePlace = function(){
    	$scope.selectedPlace.ownerId = $rootScope.currentUser.id;
    	$rootScope.loadingScreen.show();
    	$scope.selectedPlace = iotService.deletePlace($scope.selectedPlace.id,
		  function(errResp, resp) { 
    		$rootScope.loadingScreen.hide();
    		if(errResp){
   			  	$scope.showPlaces();
   			  	return;
    		}
			console.log('PLACE DELETED: >>>> ', resp);
			$scope.selectedPlace = {};
			$scope.showPlaces();
		  });
    };
    
    $scope.savePlaceArea = function(){
    	console.log("IN savePlaceArea: >>>> ", $scope.selectedPlaceArea);
    	if($scope.selectedPlace.id){
    		$scope.selectedPlaceArea.placeId = $scope.selectedPlace.id;
    	}else{
    		alert('Place Area can not be created without selecting a Place !');
    		console.log('Place Area can not be created without selecting a Place !');
    		return;
    	}
    	
    	var boards = $scope.selectedPlaceArea.boards;
    	$scope.saveAllAreaBoards(boards);
    	delete $scope.selectedPlaceArea["boards"];
    	
    	$rootScope.loadingScreen.show();
    	iotService.savePlaceArea($scope.selectedPlaceArea,
		  function(errResp, placeArea) {
    		$rootScope.loadingScreen.hide();
    			if(errResp){
    				  $scope.selectedPlaceArea.boards = boards;
    				  $scope.showDashboard();
    				  return;
    			}
    		
				 placeArea.boards = boards;
				 $scope.selectedPlaceArea.boards = boards;
	    		  if(!$scope.selectedPlace.placeAreas){
	    			  $scope.selectedPlace.placeAreas = [];
	    			  $scope.selectedPlace.placeAreas.push(placeArea);
	    		  }else{
	    			  var updated = false;
	    			  angular.forEach($scope.selectedPlace.placeAreas, function(area) {
						  if(area.id == placeArea.id){
							  var index = $scope.selectedPlace.placeAreas.indexOf(area);
							  $scope.selectedPlace.placeAreas.splice(index, 1);
							  $scope.selectedPlace.placeAreas.push(placeArea);
							  updated = true;
						  }
						});
	    			  if(!updated){
	    				  $scope.selectedPlace.placeAreas.push(placeArea); 
	    			  }
	    		  }
				  $scope.selectedPlaceArea = placeArea;
				  $scope.showDashboard();
		  });
    };
    
    $scope.fetchPlaceAreas = function(){
    	if($scope.selectedPlace.id){
    		$scope.handlePermissions();
    		
    		if($scope.isMqttConnected){
        		$scope.mqttConnectSuccess();
        	}else{
        		$scope.mqttOptions.mqttConnectSuccess = $scope.mqttConnectSuccess;
        		$scope.mqttOptions.onMqttMessageArrived = $scope.onMqttMessageArrived;
            	mqttService.connectMQTT($scope.mqttOptions);
        	}
    		
    		console.log('FETCH AREAS FOR PLACE: ', $scope.selectedPlace);
    		var findReq = {filter: {where: {placeId: $scope.selectedPlace.id}}};
    		$rootScope.loadingScreen.show();
    		iotService.findPlaceAreas(findReq,
      			  function(errResp, list) { 
		    			$rootScope.loadingScreen.hide();
    					if(errResp){
    	      				  return;
    					}
    					$scope.selectedPlace.placeAreas = list;
    					angular.forEach($scope.selectedPlace.placeAreas, function(area) {
    					  $scope.fetchBoardsAndDevices(area);
    					});
      			  });
    	}    	
    };
    
    $scope.showAddBoardPanel = function(placeArea){
    	$scope.newboard = {};
    	$scope.selectedPlaceArea = placeArea;
    	$scope.showAddBoard = placeArea.id;
    	console.log('IN showAddBoardPanel: ', $scope.showAddBoard);
    };
    
    $scope.fetchConnectedBoards = function(){
    	if(!$scope.selectedPlace || !$scope.selectedPlace.id){
    		return false;
    	}
    	var findReq = {
				filter:{
    			  		 where: {"and": [{"gatewayId": $scope.selectedPlace.gatewayId},
    			  		                {"status": "inactive"}
    			  		 				]}
								}
						};
		iotService.findBoards(findReq,
  			  function(errResp, boards) { 
					if(errResp){
						return;
					}
				  $scope.connectedBoards = boards;
				  console.log("CONNECTED BOARDS FETCHED: >>> ", $scope.connectedBoards);
  			  });
    };
    
    $scope.activateBoardAtPlaceArea = function(connectedBoard){
    	console.log("IN activateBoard: >> ", connectedBoard);
    	if(!$scope.selectedPlaceArea && !$scope.selectedPlaceArea.id){
    		return false;
    	}
    	connectedBoard.connectedToType = "PlaceArea";
    	connectedBoard.connectedToId = $scope.selectedPlaceArea.id;
    	connectedBoard.status = "active";
    	
    	iotService.saveBoard(connectedBoard,
    			  function(errResp, activeBoard) {
    					$rootScope.loadingScreen.hide();
    					if(errResp){
    						return;
    					}
	    				  console.log('BORAD ACTIVATED: >>>> ', activeBoard);
	    				  $scope.selectedPlaceArea.boards.push(activeBoard);
	    				  angular.forEach($scope.connectedBoards, function(board) {
	    					  if(board.id == connectedBoard.id){
	    						  var index = $scope.connectedBoards.indexOf(board);
	    						  $scope.connectedBoards.splice(index, 1); 
	    					  }
	    				  });
    			  });
    };
    
    $scope.saveAllAreaBoards = function(boards){
    	angular.forEach(boards, function(board) {
    			$scope.saveBoard(board);
		  });
    };
    
    $scope.saveBoard = function(board){
    	iotService.saveBoard(board,
  			  function(errResp, board) {
    				if(errResp){
    					return;
    				}
  				  	console.log('BORAD UPDATED: >>>> ', board);
  			  });
    };
    
    $scope.cancelAddBoard = function(){
    	console.log('In cancelAddBoard: >>>');
    	$scope.newboard = {};
    	$scope.selectedPlaceArea = {};
    	$scope.showAddBoard = '';
    };
    
    $scope.fetchBoardsAndDevices = function(placeArea){
    	if(placeArea && placeArea.id){
    		console.log('FETCH BOARDS AND DEVICES FOR PLACEAREA: ', placeArea);
    		var findReq = {
    				filter:{
        			  		 where: {"and": [{"connectedToId": placeArea.id},
        			  		                 {"status": "active"}
        			  		 				]}
    								}
    						};
    		console.log("findReq for fetching PlaceArea active boards: >> ", findReq);
    		iotService.findBoards(findReq,
      			  function(errResp, boards) { 
    					if(errResp){
    						return;
    					}
    				  placeArea.boards = boards;
    				  console.log("BOARDS FETCHED: >>> ", placeArea.boards);
    				  angular.forEach(boards, function(board) {
    					  angular.forEach(board.devices, function(device) {
    						  if(device.analog){
    							  try{
    								  device.analogValue = parseInt(device.analogValue);
    							  }catch(err){
    								  device.analogValue = 0;
    							  }
    						  }
    					  });
    				  });
      			  });
    	}    	
    };
    
    $scope.toggleDevice = function(board, device){
    	console.log('IN toggleDevice, device: >> ', device);
    	if(device.status == 'ON'){
    		device.status = 'OFF';
    		device.value = 0;
    	}else{
    		device.status = 'ON';
    		device.value = 1;
    	}
    	
    	var msg = {d:
    				{
    		  			gatewayId: $scope.selectedPlace.gatewayId,
						boardId: board.uniqueIdentifier,
						deviceIndex: device.deviceIndex,
						deviceValue: device.value
					}
    			  };
    	console.log('$scope.selectedPlace.gatewayId: >>' , $scope.selectedPlace.gatewayId);
    	var topic = "iot-2/type/" +CONFIG.IOT_CONFIG.gatewayType +"/id/"+$scope.selectedPlace.gatewayId+"/evt/gateway/fmt/json";
    	mqttService.publishToMqtt(topic, msg);
    };
    
    $scope.analogValueChanged = function(board, device){
    	console.log('IN analogValueChanged, device: >> ', device);
    	if(device.value == 0){
    		return false;
    	}
    	var msg = {d:
    				{
    		  			gatewayId: $scope.selectedPlace.gatewayId,
						boardId: board.uniqueIdentifier,
						deviceIndex: device.deviceIndex,
						deviceValue: device.value,
						analogValue: device.analogValue
					}
    			  };
    	var topic = "iot-2/type/" +CONFIG.IOT_CONFIG.gatewayType +"/id/"+$scope.selectedPlace.gatewayId+"/evt/gateway/fmt/json";
    	mqttService.publishToMqtt(topic, msg);
    };
    
    $scope.getDeviceIconClass = function(device){
    	console.log('IN getDeviceIconClass:>>>> ', device);
    	var cssClass = '';
    	if(device.status > 0){
    		cssClass = device.type + '_ON';
    	}
    	if(device.status < 1){
    		cssClass = device.type + '_OFF';
    	}
    	return cssClass;    	
    };
    
  }
  
  ctrl.$inject = ['$rootScope', '$scope', 'CONFIG', 'authService', 'mqttService', 'dataService', 'iotService'];
  return ctrl;

});

