
define(['angular'], function (angular) {
    "use strict";

  var factory = function (CONFIG, $http, Place, PlaceArea, Board, Group) {

	  var service = {};

	  service.findPlaces = function(findReq, callback) {
		  console.log("In iotService.findPlaces: >>> ", findReq);
		  Place.find(findReq,
    			  function(list) { 
    				  if(callback){
    					  callback(null, list);
    				  }			  
    			  },
	    		  function(errorResponse) { 
    				  console.log("ERROR in findPlaces: >>> ", errorResponse);
    				  callback(errorResponse, null);
    			  });
	  };
	  
	  service.fetchSensorsData = function(sensorDataReq, callback){
		  console.log("In iotService.fetchSensorsData: >>> ", sensorDataReq);
		  Place.sensorData(sensorDataReq,
    			  function(resp) { 
					  if(callback){
						  callback(null, resp);
					  }
    			  },
	    		  function(errorResponse) { 
    				  console.log("ERROR in fetchSensorsData: >>> ", errorResponse);
    				  callback(errorResponse, null);
    			  });
	  };
	  
	  service.savePlace = function(placeObj, callback){
		  console.log("In iotService.savePlace: >>> ", placeObj);
		  Place.upsert(placeObj,
				  function(place) { 
					  if(callback){
						  callback(null, place);
					  }
				  },
				  function(errorResponse) { 
					  console.log("ERROR in savePlace: >>> ", errorResponse);
					  callback(errorResponse, null);
				  });
	  };
	  
	  service.deletePlace = function(placeId, callback){
		  console.log("In iotService.deletePlace: >>> ", placeId);
		  Place.deleteById({id: placeId},
				  function(resp) { 
					  if(callback){
						  callback(null, resp);
					  }
				  },
				  function(errorResponse) { 
					  console.log("ERROR in deletePlace: >>> ", errorResponse);
					  callback(errorResponse, null);
				  });
	  };
	  
	  service.savePlaceArea = function(placeAreaObj, callback){
		  console.log("In iotService.savePlaceArea: >>> ", placeAreaObj);
		  PlaceArea.upsert(placeAreaObj,
				  function(placeArea) { 
					  if(callback){
						  callback(null, placeArea);
					  }
				  },
				  function(errorResponse) { 
					  console.log("ERROR in savePlaceArea: >>> ", errorResponse);
					  callback(errorResponse, null);
				  });
	  };
	  
	  service.findPlaceAreas = function(findReq, callback) {
		  console.log("In iotService.findPlaceAreas: >>> ", findReq);
		  PlaceArea.find(findReq,
    			  function(list) { 
    				  if(callback){
    					  callback(null, list);
    				  }			  
    			  },
	    		  function(errorResponse) { 
    				  console.log("ERROR in findPlaceAreas: >>> ", errorResponse);
    				  callback(errorResponse, null);
    			  });
	  };
	  
	  service.findBoards = function(findReq, callback) {
		  console.log("In iotService.findBoards: >>> ", findReq);
		  Board.find(findReq,
    			  function(list) { 
    				  if(callback){
    					  callback(null, list);
    				  }			  
    			  },
	    		  function(errorResponse) { 
    				  console.log("ERROR in findBoards: >>> ", errorResponse);
    				  callback(errorResponse, null);
    			  });
	  };
	  
	  service.saveBoard = function(boardObj, callback){
		  console.log("In iotService.saveBoard: >>> ", boardObj);
		  Board.upsert(boardObj,
				  function(board) { 
					  if(callback){
						  callback(null, board);
					  }
				  },
				  function(errorResponse) { 
					  console.log("ERROR in saveBoard: >>> ", errorResponse);
					  callback(errorResponse, null);
				  });
	  };
	  
	  service.findGroups = function(findReq, callback) {
		  console.log("In iotService.findGroups: >>> ", findReq);
		  Group.find(findReq,
    			  function(list) { 
    				  if(callback){
    					  callback(null, list);
    				  }			  
    			  },
	    		  function(errorResponse) { 
    				  console.log("ERROR in findGroups: >>> ", errorResponse);
    				  callback(errorResponse, null);
    			  });
	  };

	  return service;
	
  }

	factory.$inject = ['CONFIG', '$http', 'Place', 'PlaceArea', 'Board', 'Group'];
	return factory;
});

