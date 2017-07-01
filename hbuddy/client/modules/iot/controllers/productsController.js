define(function () {
    'use strict';

  function ctrl($rootScope, $scope, Board, Device){
	  
	  $scope.display = 'boards';
	  $scope.selectedBoard = {};
	  $scope.boards = [];
	  $scope.boardTypes = ["SWITCH_BOARD", "SENSOR_BOARD", "HukamGateway"];
	  $scope.switches = {"digital": [1, 2, 3, 4, 5, 6, 7, 8, 9], "analog": [1, 2, 3, 4, 5, 6, 7, 8, 9]};
	  $scope.selectedSwitchCounts = {digital: 0, analog: 0};
	  
	  $scope.initProducts = function(){
//		  $scope.fetchAndShowBoards();
		  console.log("IN initProducts: >>> ");
		  $rootScope.checkUser(function(currentUser){
			  $rootScope.currentUser = currentUser;
			  if(!$rootScope.currentUser){
		    		return;
		    	}
			  
		    	$scope.ownerId = $rootScope.currentUser.id;
		    	if($rootScope.currentUser.userId){
		    		$scope.ownerId = $rootScope.currentUser.userId;
		    	}
			  
			  if($rootScope.currentUser.role == 'admin'){
				  $scope.fetchAndShowBoards();
			  }
		  });
	  }
	  
	  $scope.fetchAndShowBoards = function(){
		  console.log('IN fetchAndShowBoards: ');
		  $scope.selectedBoard = {};
			  $scope.fetchBoards();
			  $scope.display = "boards";
	  };
	  
	  $scope.showAddNewBoardPanel = function(){
		  console.log('IN showAddNewBoardPanel: ');
		  $scope.selectedBoard = {};
		  $scope.display = "saveBoardPanel";
	  };
	  
	  $scope.showUpdateBoardPanel = function(group){
		  console.log('IN showUpdateBoardPanel for Board: ', board);
		  $scope.selectedBoard = board;
		  $scope.display = "saveBoardPanel";
	  };
	  
    $scope.fetchBoards = function(){
    	console.log('IN fetchBoards >>>>>>>>>> ');
    	
    	if($scope.boards && $scope.boards.length > 0){
    		return false;
    	}
    	
    	$scope.showAddMember = '';
    	var findReq = {};
    	$rootScope.loadingScreen.show();
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	
    	var email = $rootScope.currentUser.profile && $rootScope.currentUser.profile.email;
    	if(!email){
    		email = $rootScope.currentUser.email;
    	}
    	console.log("findReq to fetchBoards: >>>", findReq);
    	Board.find(findReq,
    			  function(list) { 
    				  $rootScope.loadingScreen.hide();
    				  $scope.boards = list;
    				  console.log("BOARDS FETCHED: >>> ", $scope.boards);
    				  $scope.display = 'boards';
    			  },
	    		  function(errorResponse) { 
    				  console.log(errorResponse);
    				  $scope.display = 'boards';
    				  $rootScope.loadingScreen.hide();
    			  });
    };
    
    $scope.showUpdateBoard = function(board){
    	console.log('IN showUpdateBoard: >>> ', board);
    	$scope.selectedBoard = board;
    	$scope.display = 'saveBoardPanel';
    };
    
    $scope.saveBoard = function(){
    	console.log('$rootScope.currentUser: >> ', $rootScope.currentUser);
    	
    	if($scope.selectedBoard.type == 'HukamGateway'){
    		$scope.saveGatewayDevice();
    		return;
    	}
    	
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	$scope.selectedBoard.owner = {};
    	$scope.selectedBoard.owner.ownerId = ownerId;
    	
    	var email = $rootScope.currentUser.profile && $rootScope.currentUser.profile.email;
    	if(!email){
    		email = $rootScope.currentUser.email;
    	}
    	
    	$scope.selectedBoard.owner.username = email;
    	console.log('IN saveBoard: >>>>>', $scope.selectedBoard);
    	$rootScope.loadingScreen.show();
    	if(!$scope.selectedBoard.uniqueIdentifier){
    		$scope.selectedBoard.uniqueIdentifier = $scope.generateUUID();
    	}
    	
    	if(!$scope.selectedBoard.type){
    		$scope.selectedBoard.type = $scope.boardTypes[0];
    	}
    	
    	delete $scope.selectedBoard.devices;
    	if($scope.selectedBoard.type == 'SWITCH_BOARD'){
    		$scope.selectedBoard = $scope.addDevicesBasedOnType($scope.selectedBoard);
    	}
    	
    	console.log("$scope.selectedBoard: >>> ", $scope.selectedBoard);
    	
    	$scope.selectedBoard = Board.upsert($scope.selectedBoard,
		  function(board) { 
    		$rootScope.loadingScreen.hide();
			$scope.selectedBoard = board;
			console.log('BOARD SAVED: >>>> ', board);
			$scope.fetchAndShowBoards();
		  },
		  function(errorResponse) {
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
			  $scope.fetchAndShowBoards();
		  });
		  
    };
    
    $scope.saveGatewayDevice = function(){
    	console.log("IN saveGatewayDevice: >>> $scope.selectedBoard: ", $scope.selectedBoard);
    	var deviceToSave = {
    							deviceId: $scope.selectedBoard.uniqueIdentifier,
    							typeId: $scope.selectedBoard.type,
    							deviceInfo: {
    								"serialNumber": $scope.selectedBoard.uniqueIdentifier,
    							    "manufacturer": $scope.selectedBoard.manufacturer,
    							    "model": $scope.selectedBoard.model,
    							    "deviceClass": $scope.selectedBoard.deviceClass,
    							    "description": $scope.selectedBoard.description,
    							    "fwVersion": $scope.selectedBoard.fwVersion,
    							    "hwVersion": $scope.selectedBoard.hwVersion,
    							    "descriptiveLocation": $scope.selectedBoard.descriptiveLocation
    							}
    						};
    	console.log("IN saveGatewayDevice: >>> deviceToSave: ", deviceToSave);
    	if(!deviceToSave.deviceId){
    		return;
    	}
    	
    	$scope.selectedBoard = Device.upsert(deviceToSave,
    			  function(updatedDevice) { 
    	    		$rootScope.loadingScreen.hide();
    				$scope.selectedBoard = updatedDevice;
    				console.log('DEVICE SAVED: >>>> ', updatedDevice);
    				$scope.fetchAndShowBoards();
    			  },
    			  function(errorResponse) {
    				  $rootScope.loadingScreen.hide();
    				  console.log(errorResponse);
    				  $scope.fetchAndShowBoards();
    			  });
    };
    
    $scope.generateUUID = function() {
	    var d = new Date().getTime();
	    var uuid = 'yxxx-yxxx-yxxx'.replace(/[xy]/g,function(c) {
	        var r = (d + Math.random()*8)%8 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid.toUpperCase();
	};
    
    $scope.addDevicesBasedOnType = function(board){
    	console.log("IN addDevicesBasedOnType, selectedSwitchCounts: ", $scope.selectedSwitchCounts, ", board: ", board);
    	if($scope.selectedSwitchCounts.digital > 0){
    		board = $scope.addDigitalDevices(board, 1, $scope.selectedSwitchCounts.digital);
    	}
    	
    	if($scope.selectedSwitchCounts.analog > 0){
    		if($scope.selectedSwitchCounts.digital > 0){
    			board = $scope.addAnalogDevices(board, (parseInt($scope.selectedSwitchCounts.digital)+1), (parseInt($scope.selectedSwitchCounts.digital) + parseInt($scope.selectedSwitchCounts.analog)));
    		}else{
    			board = $scope.addAnalogDevices(board, 1, (parseInt($scope.selectedSwitchCounts.digital) + parseInt($scope.selectedSwitchCounts.analog)));
    		}
    	}
    	return board;
    };
    
    $scope.addDigitalDevices = function(board, startIndex, endIndex){
    	if(!board.devices){
    		board.devices = [];
    	}
    	var updatedAt = new Date();
    	for(var i = parseInt(startIndex); i <= parseInt(endIndex); i++){
    		board.devices.push({
    			"parentId": board.uniqueIdentifier,
    			"title": "DS"+i,
    			"description": "Digital Switch",
    			"status": "OFF",
    			"value": 0,
    			"type": "bulb",
    			"analog": false,
    			"deviceIndex": i,
    			"updatedAt": updatedAt
    		});
    	}
    	console.log("IN addDigitalDevices.END, board: >> ", board.devices);
    	return board;
    };
    
    $scope.addAnalogDevices = function(board, startIndex, endIndex){
    	if(!board.devices){
    		board.devices = [];
    	}
    	var updatedAt = new Date();
    	for(var i = startIndex; i <= endIndex; i++){
    		board.devices.push({
    			"parentId": board.uniqueIdentifier,
    			"title": "AS"+i,
    			"description": "Analog Switch",
    			"status": "OFF",
    			"value": 0,
    			"type": "bulb",
    			"analog": true,
    			"analogValue": 10,
    			"deviceIndex": i,
    			"updatedAt": updatedAt
    		});
    	}
    	console.log("IN addAnalogDevices.END, board: >> ", board.devices);
    	return board;
    };
    
  }
  
  ctrl.$inject = ['$rootScope', '$scope', 'Board', 'Device'];
  return ctrl;

});

