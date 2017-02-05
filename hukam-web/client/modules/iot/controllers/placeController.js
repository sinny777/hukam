define(function () {
    'use strict';

  function ctrl($rootScope, $scope, CONFIG, authService, mqttService, dataService, Place, PlaceArea, Board, Group){
	  
	  $scope.memberships = [];
	  $scope.places = [];
	  $scope.selectedPlace = {floor: 'Ground'};
	  $scope.display = 'places';
	  $scope.selectedPlaceArea = {};
	  $scope.newboard = {};
	  $scope.isMqttConnected = false;
	  $scope.mqttOptions = {api_key: CONFIG.IOT_CONFIG.auth_key, 
			  				auth_token: CONFIG.IOT_CONFIG.auth_token,
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
	   	try{
	   		  $scope.isMqttConnected = true;
					var subscribeTopic = "iot-2/type/GransLiveGateway/id/" +$scope.selectedPlace.gatewayId + "/evt/+/fmt/json";
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
	    	Group.find(findReq,
	  			  function(list) { 
	    			  console.log('RESPONSE of GROUP.find: >>>>> ', list);
	  				  $scope.memberships = list;
	  				  $rootScope.loadingScreen.hide();
	  				  $scope.fetchMyPlaces();
	  			  },
	      		  function(errorResponse) { 
	  				  $rootScope.loadingScreen.hide();
	  				  console.log(errorResponse);
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
    	$scope.places = Place.find(findReq,
    			  function(list) { 
    				  $rootScope.loadingScreen.hide();
    				  $scope.places = list;
    				  $scope.display = 'places';
    				  if($scope.places && $scope.places.length == 1){
						  $scope.selectedPlace = $scope.places[0];
						  $scope.fetchPlaceSensorsData();
						  $scope.fetchConnectedBoards();
						  $scope.display = "dashboard";
						  $scope.fetchPlaceAreas();
					  }    				  
    				  
    				  angular.forEach($scope.places, function(place) {
    					  console.log('PLACE FETCHED: >>>> ', place);
    					  if(place.isDefault){
    						  $scope.selectedPlace = place;
    						  $scope.display = "dashboard";
    						  $scope.fetchPlaceAreas();
    					  }
    					});
    			  },
	    		  function(errorResponse) { 
    				  $rootScope.loadingScreen.hide();
    				  console.log(errorResponse);
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
    		Board.find(findReq,
      			  function(sensors) { 
    				  console.log("SENSOR BOARD FETCHED: >>> ", sensors);
    				  angular.forEach(sensors, function(sensor) {
    	    			  sensorDataReq.type = sensor.subType;
    	    			  sensorDataReq.uniqueId = sensor.uniqueIdentifier;
    	    			  
    	    			  Place.sensorData(sensorDataReq,
    	    	    			  function(resp) { 
    	    	    				  console.log("RESPONSE OF Place.sensorData: >>> ", resp);
    	    	    			  },
    	    		    		  function(errorResponse) { 
    	    	    				  console.log(errorResponse);
    	    	    			  });
    	    			});
      			  },
  	    		  function(errorResponse) { 
      				  console.log(errorResponse);
      		});
    	}
    };
    
    $scope.savePlace = function(){
    	$scope.selectedPlace.ownerId = $rootScope.currentUser.userId;
    	
    	var areas = $scope.selectedPlace.placeAreas;
    	delete $scope.selectedPlace["placeAreas"];
    	
    	$rootScope.loadingScreen.show();
    	$scope.selectedPlace = Place.upsert($scope.selectedPlace,
		  function(place) { 
    		$rootScope.loadingScreen.hide();
			$scope.selectedPlace = place;
			console.log('PLACE SAVED: >>>> ', place);
			$scope.selectedPlace.placeAreas = areas;
			$scope.showPlaces();
		  },
		  function(errorResponse) { 
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
			  $scope.selectedPlace.placeAreas = areas;
			  $scope.showPlaces();
		  });
    };
    
    $scope.deletePlace = function(){
    	$scope.selectedPlace.ownerId = $rootScope.currentUser.id;
    	$rootScope.loadingScreen.show();
    	$scope.selectedPlace = Place.deleteById({id: $scope.selectedPlace.id},
		  function(resp) { 
			console.log('PLACE DELETED: >>>> ', resp);
			$scope.selectedPlace = {};
			$scope.showPlaces();
			$rootScope.loadingScreen.hide();
		  },
		  function(errorResponse) { 
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
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
    	PlaceArea.upsert($scope.selectedPlaceArea,
		  function(placeArea) {
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
			  $rootScope.loadingScreen.hide();
			  $scope.showDashboard();
		  },
		  function(errorResponse) { 
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
			  $scope.selectedPlaceArea.boards = boards;
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
    		PlaceArea.find(findReq,
      			  function(list) { 
    				  $scope.selectedPlace.placeAreas = list;
    				  $rootScope.loadingScreen.hide();
    				  
    				  angular.forEach($scope.selectedPlace.placeAreas, function(area) {
    					  $scope.fetchBoardsAndDevices(area);
    					});
      			  },
  	    		  function(errorResponse) { 
      				  $rootScope.loadingScreen.hide();
      				  console.log(errorResponse);
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
		Board.find(findReq,
  			  function(boards) { 
				  $scope.connectedBoards = boards;
				  console.log("CONNECTED BOARDS FETCHED: >>> ", $scope.connectedBoards);
  			  },
	    		  function(errorResponse) { 
  				  console.log(errorResponse);
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
    	
    	Board.upsert(connectedBoard,
    			  function(activeBoard) {
    				  console.log('BORAD ACTIVATED: >>>> ', activeBoard);
    				  $scope.selectedPlaceArea.boards.push(activeBoard);
    				  $rootScope.loadingScreen.hide();
    				  angular.forEach($scope.connectedBoards, function(board) {
    					  if(board.id == connectedBoard.id){
    						  var index = $scope.connectedBoards.indexOf(board);
    						  $scope.connectedBoards.splice(index, 1); 
    					  }
    				  });
    			  },
    			  function(errorResponse) { 
    				  $rootScope.loadingScreen.hide();
    				  console.log(errorResponse);
    			  });
    };
    
    $scope.saveAllAreaBoards = function(boards){
    	angular.forEach(boards, function(board) {
    			$scope.saveBoard(board);
		  });
    };
    
    $scope.saveBoard = function(board){
    	Board.upsert(board,
  			  function(board) {
  				  console.log('BORAD UPDATED: >>>> ', board);
  			  },
  			  function(errorResponse) { 
  				  console.log(errorResponse);
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
    		Board.find(findReq,
      			  function(boards) { 
    				  placeArea.boards = boards;
    				  console.log("BOARDS FETCHED: >>> ", placeArea.boards);
      			  },
  	    		  function(errorResponse) { 
      				  console.log(errorResponse);
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
    	var topic = "iot-2/type/GransLiveGateway/id/"+$scope.selectedPlace.gatewayId+"/evt/gateway/fmt/json";
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
    	var topic = "iot-2/type/GransLiveGateway/id/"+$scope.selectedPlace.gatewayId+"/evt/gateway/fmt/json";
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
  
  ctrl.$inject = ['$rootScope', '$scope', 'CONFIG', 'authService', 'mqttService', 'dataService', 'Place', 'PlaceArea', 'Board', 'Group'];
  return ctrl;

});

