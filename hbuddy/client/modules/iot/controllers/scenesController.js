define(function () {
    'use strict';

  function ctrl($rootScope, $scope, Scene, mqttService){
	  
	  $scope.display = 'scenes';
	  $scope.selectedScene = {};
	  $scope.sceneTypes = ['TIME', 'TEMPERATURE', 'HUMIDITY', 'LIGHT', 'COMBINATION'];
	  
	  $scope.placeForScene = {};
	  
	  $scope.initScenes = function(){
		  console.log("IN initScenes Page: ", $scope.selectedPlace);
		  $scope.fetchAndShowScenes();
	  };
	  
	  $scope.fetchAndShowScenes = function(){
		  console.log('IN fetchAndShowScenes: ', $scope.selectedPlace.scenes);
		  $scope.selectedScene = {};
		  if(!$scope.selectedPlace.scenes || $scope.selectedPlace.scenes.length == 0){
			  $scope.fetchScenes();
		  }else{
			  $scope.display = "scenes";
		  }
	  };
	  
	  $scope.showAddNewScenePanel = function(){
		  console.log('IN showAddNewScenePanel: ');
		  $scope.selectedScene = {};
		  $scope.display = "saveScenePanel";
		  $scope.addAllDevicesForScene();
	  };
	  
	  $scope.showUpdateScenePanel = function(scene){
		  console.log('IN showUpdateScenePanel for Scene: ', scene);
		  $scope.selectedScene = scene;
		  $scope.display = "saveScenePanel";
		  $scope.addAllDevicesForScene();
	  };
	  
	  $scope.addAllDevicesForScene = function(){
		  $scope.placeForScene = {"areas": []};
		  if($scope.selectedPlace && $scope.selectedPlace.placeAreas){
    		  for(var i = 0; i < $scope.selectedPlace.placeAreas.length; i++){
        		  var placeArea = $scope.selectedPlace.placeAreas[i];
        		  var areaForScene = {
        				  			  "areaType": "PlaceArea",
				        		      "areaId": placeArea.id,
				        		      "areaTitle": placeArea.title,
				        		      "devices": []
        		  					 };
        		  if(placeArea.boards){
        			  for(var j = 0; j < placeArea.boards.length; j++){
                		  var board = placeArea.boards[j];
                		  if(board.devices){
                			  for(var k = 0; k < board.devices.length; k++){
                        		  var device = JSON.parse(JSON.stringify(board.devices[k]));
                        		  device.status = "OFF";
                        		  device.value = 0;
                        		  if(device.analog){
                        			  device.analogValue = 10;
                        		  }
                        		  device = $scope.checkIfDeviceExistsInScene(areaForScene, device);
                        		  areaForScene.devices.push(device);
                			  }
                		  }
            		  } 
        		  }
        		  
        		  $scope.placeForScene.areas.push(areaForScene);
        		  
    		  }  
    	  }
		  console.log("IN addAllDevicesForScene.END, placeForScene: >>> ", $scope.placeForScene);
	  };
	  
	$scope.checkIfDeviceExistsInScene = function(areaForScene, device){
		if(!$scope.selectedScene.areas){
			return device;
		}
		
		for(var i = 0; i < $scope.selectedScene.areas.length; i++){
    		var area = $scope.selectedScene.areas[i];
    		if(area.areaId == areaForScene.areaId){
    			if(!area.devices){
    				return device;
    			}
    			
    			for(var j = 0; j < area.devices.length; j++){
    				var existingDevice =  area.devices[j];
    				if(existingDevice.parentId == device.parentId && existingDevice.deviceIndex == device.deviceIndex){
    					device = JSON.parse(JSON.stringify(existingDevice));
    					device.added = true;
    					console.log("DEVICE IN SCENE: >> ", device);
    					break;
    				}else{
    					device.added = false;
    				}
    			}
    		}
    	}
		return device;
	};
	  
	  
    $scope.fetchScenes = function(){
    	console.log('IN fetchScenes for Place >>>>>>>>>> ', $scope.selectedPlace);
    	$rootScope.loadingScreen.show();
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	
    	var email = $rootScope.currentUser.profile && $rootScope.currentUser.profile.email;
    	if(!email){
    		email = $rootScope.currentUser.email;
    	}
    	
    	var findReq = {
				filter:{
							where: {"placeId": $scope.selectedPlace.id}
						}
					   };
    	
    	Scene.find(findReq,
    			  function(list) { 
    				  $rootScope.loadingScreen.hide();
    				  $scope.selectedPlace.scenes = list;
    				  console.log("SCENES FETCHED :>>> ", list);
    				  $scope.display = 'scenes';
    			  },
	    		  function(errorResponse) { 
    				  console.log(errorResponse);
    				  $scope.display = 'scenes';
    				  $rootScope.loadingScreen.hide();
    			  });
    };
    
    $scope.saveScene = function(){
    	console.log('$rootScope.currentUser: >> ', $rootScope.currentUser);
    	console.log('$scope.selectedPlace: >> ', $scope.selectedPlace);
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	$scope.selectedScene.ownerId = ownerId;
    	$scope.selectedScene.placeId = $scope.selectedPlace.id;
    	console.log('IN saveScene: >>>>>', $scope.selectedScene);
    	
    	$rootScope.loadingScreen.show();
    	$scope.selectedScene = Scene.upsert($scope.selectedScene,
		  function(scene) { 
    		$rootScope.loadingScreen.hide();
			$scope.selectedScene = scene;
			console.log('SCENE SAVED: >>>> ', scene);
			if(!$scope.selectedPlace.scenes){
				$scope.selectedPlace.scenes = [];
			}
			
			var sceneFound = false;
			for(var i = 0; i < $scope.selectedPlace.scenes.length; i++){
				var existingScene = $scope.selectedPlace.scenes[i];
				if(existingScene.id == scene.id){
					existingScene = scene;
					sceneFound = true;
				}
			}
			if(!sceneFound){
				$scope.selectedPlace.scenes.push(scene);
			}
			
			var topic = "iot-2/type/GransLiveGateway/id/"+$scope.selectedPlace.gatewayId+"/evt/gateway/fmt/json";
			var msg = {"action": "update", "type": "Scene", "data": scene};
	    	mqttService.publishToMqtt(topic, msg);
		  },
		  function(errorResponse) {
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
			  $scope.fetchAndShowScenes();
		  });
    };
    
    $scope.executeScene = function(scene){
    	console.log("IN executeScene: >>>>, ", scene);
    };
    
    $scope.deleteScene = function(scene){
    	console.log("IN deleteScene: >>>>, ", scene);
    };
    
    $scope.toggleDevice = function(device){
    	console.log('IN toggleDevice, device: >> ', device);
    	if(device.status == 'ON'){
    		device.status = 'OFF';
    		device.value = 0;
    	}else{
    		device.status = 'ON';
    		device.value = 1;
    	}
    };
    
    $scope.showAddDevicesModal = function(){
    	console.log("IN showAddDevicesModal: >>> ");
    };
    
    $scope.addDeviceToScene = function(areaForScene, device){
    	device.added = true;
    	if(!$scope.selectedScene.areas){
    		$scope.selectedScene.areas = [];
    	} 
    	var areaExists = false;
    	for(var i = 0; i < $scope.selectedScene.areas.length; i++){
    		var area = $scope.selectedScene.areas[i];
    		if(area.areaId == areaForScene.areaId){
    			areaExists = true;
    			
    			if(!area.devices){
    				area.devices = [];
    			}
    			
    			var deviceExists = false;
    			for(var j = 0; j < area.devices.length; j++){
    				var existingDevice =  area.devices[j];
    				if(existingDevice.parentId == device.parentId && existingDevice.deviceIndex == device.deviceIndex){
    					deviceExists = true;
    					existingDevice = device;
    				}
    			}
    			if(!deviceExists){
    				area.devices.push(device);
    			}
    		}
    	}
    	if(!areaExists){
    		var newSceneArea = {
    							  "areaType": "PlaceArea",
			    			      "areaId": areaForScene.areaId,
			    			      "areaTitle": areaForScene.areaTitle,
			    			      "devices": []
    							};
    		newSceneArea.devices.push(device);
    		$scope.selectedScene.areas.push(newSceneArea);
    	}
    };
    
    $scope.removeDeviceFromScene = function(areaForScene, device){
    	device.added = false;
    	if(!$scope.selectedScene.areas){
    		$scope.selectedScene.areas = [];
    	} 

    	for(var i = 0; i < $scope.selectedScene.areas.length; i++){
    		var area = $scope.selectedScene.areas[i];
    		if(area.areaId == areaForScene.areaId){
    			if(!area.devices){
    				area.devices = [];
    			}
    			
    			for(var j = 0; j < area.devices.length; j++){
    				var existingDevice =  area.devices[j];
    				if(existingDevice.parentId == device.parentId && existingDevice.deviceIndex == device.deviceIndex){
    					var index = area.devices.indexOf(existingDevice);
    					area.devices.splice(index, 1); 
    				}
    			}
    		}
    	}
    };
    
    
  }
  
  ctrl.$inject = ['$rootScope', '$scope', 'Scene', 'mqttService'];
  return ctrl;

});

